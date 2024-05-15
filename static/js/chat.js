import {
  html,
  h,
  signal,
  effect,
  computed,
  render,
  useSignal,
  useEffect,
  useRef,
  Component,
} from "/static/js/utils.js";

import { llama } from "/static/js/completion.js";
let selected_image = false;
var slot_id = -1;

const session = signal({
  prompt:
    "This is a conversation between User and Llama, a friendly chatbot. Llama is helpful, kind, honest, good at writing, and never fails to answer any requests immediately and with precision.",
  template: "{{prompt}}\n\n{{history}}\n{{char}}:",
  historyTemplate: "{{name}}: {{message}}",
  transcript: [],
  type: "chat", // "chat" | "completion"
  char: "Llama",
  user: "User",
  image_selected: "",
});

const params = signal({
  n_predict: 400,
  temperature: 0.7,
  repeat_last_n: 256, // 0 = disable penalty, -1 = context size
  penalize_nl: false,
  top_k: 40, // <= 0 to use vocab size
  top_p: 0.95, // 1.0 = disabled
  min_p: 0.05, // 0 = disabled
  tfs_z: 1.0, // 1.0 = disabled
  typical_p: 1.0, // 1.0 = disabled
  presence_penalty: 0.0, // 0.0 = disabled
  frequency_penalty: 0.0, // 0.0 = disabled
  mirostat: 0, // 0/1/2
  mirostat_tau: 5, // target entropy
  mirostat_eta: 0.1, // learning rate
  grammar: "",
  n_probs: 0, // no completion_probabilities,
  min_keep: 0, // min probs from each sampler,
  image_data: [],
  cache_prompt: true,
  api_key: "",
});

const llamaStats = signal(null);
const controller = signal(null);

// currently generating a completion?
const generating = computed(() => controller.value != null);

// has the user started a chat?
const chatStarted = computed(() => session.value.transcript.length > 0);

const transcriptUpdate = (transcript) => {
  session.value = {
    ...session.value,
    transcript,
  };
};

// simple template replace
const template = (str, extraSettings) => {
  let settings = session.value;
  if (extraSettings) {
    settings = { ...settings, ...extraSettings };
  }
  return String(str).replaceAll(/\{\{(.*?)\}\}/g, (_, key) =>
    template(settings[key])
  );
};

async function runLlama(prompt, llamaParams, char) {
  const currentMessages = [];
  const history = session.value.transcript;
  if (controller.value) {
    throw new Error("already running");
  }
  controller.value = new AbortController();
  for await (const chunk of llama(prompt, llamaParams, {
    controller: controller.value,
    api_url: location.pathname.replace(/\/+$/, ""),
  })) {
    const data = chunk.data;

    if (data.stop) {
      while (
        currentMessages.length > 0 &&
        currentMessages[currentMessages.length - 1].content.match(/\n$/) != null
      ) {
        currentMessages.pop();
      }
      transcriptUpdate([...history, [char, currentMessages]]);
      console.log(
        "Completion finished: '",
        currentMessages.map((msg) => msg.content).join(""),
        "', summary: ",
        data
      );
    } else {
      currentMessages.push(data);
      slot_id = data.slot_id;
      transcriptUpdate([...history, [char, currentMessages]]);
    }

    if (data.timings) {
      llamaStats.value = data;
    }
  }

  controller.value = null;
}

// send message to server
const chat = async (msg) => {
  if (controller.value) {
    console.log("already running...");
    return;
  }

  transcriptUpdate([...session.value.transcript, ["{{user}}", msg]]);

  let prompt = template(session.value.template, {
    message: msg,
    history: session.value.transcript
      .flatMap(([name, data]) =>
        template(session.value.historyTemplate, {
          name,
          message: Array.isArray(data)
            ? data
                .map((msg) => msg.content)
                .join("")
                .replace(/^\s/, "")
            : data,
        })
      )
      .join("\n"),
  });
  if (selected_image) {
    prompt = `A chat between a curious human and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the human's questions.\nUSER:[img-10]${msg}\nASSISTANT:`;
  }
  await runLlama(
    prompt,
    {
      ...params.value,
      slot_id: slot_id,
      stop: ["</s>", template("{{char}}:"), template("{{user}}:")],
    },
    "{{char}}"
  );
};

const stop = (e) => {
  e.preventDefault();
  if (controller.value) {
    controller.value.abort();
    controller.value = null;
  }
};

const reset = (e) => {
  stop(e);
  transcriptUpdate([]);
};

function MessageInput() {
  const message = useSignal("");

  const submit = (e) => {
    stop(e);
    chat(message.value);
    message.value = "";
  };

  const enterSubmits = (event) => {
    if (event.which === 13 && !event.shiftKey) {
      submit(event);
    }
  };

  return html`
    <form onsubmit=${submit}>
      <div>
        <textarea
          className=${generating.value ? "loading" : null}
          oninput=${(e) => (message.value = e.target.value)}
          onkeypress=${enterSubmits}
          placeholder="Say something..."
          rows="2"
          type="text"
          value="${message}"
        />
      </div>
      <div class="right">
        <button type="submit" disabled=${generating.value}>Send</button>
        <button onclick=${stop} disabled=${!generating.value}>Stop</button>
        <button onclick=${stop}>Analyze</button>
        <button onclick=${reset}>Reset</button>
      </div>
    </form>
  `;
}

const ChatLog = (props) => {
  const messages = session.value.transcript;
  const container = useRef(null);

  useEffect(() => {
    // scroll to bottom (if needed)
    const parent = container.current.parentElement;
    if (
      parent &&
      parent.scrollHeight <= parent.scrollTop + parent.offsetHeight + 300
    ) {
      parent.scrollTo(0, parent.scrollHeight);
    }
  }, [messages]);

  const isCompletionMode = session.value.type === "completion";
  const chatLine = ([user, data], index) => {
    let message;
    const isArrayMessage = Array.isArray(data);
    if (params.value.n_probs > 0 && isArrayMessage) {
      message = html`<${Probabilities} data=${data} />`;
    } else {
      const text = isArrayMessage
        ? data
            .map((msg) => msg.content)
            .join("")
            .replace(/^\s+/, "")
        : data;
      message = isCompletionMode
        ? text
        : html`<${Markdownish} text=${template(text)} />`;
    }
    if (user) {
      return html`<p key=${index}>
        <strong>${template(user)}:</strong> ${message}
      </p>`;
    } else {
      return isCompletionMode
        ? html`<span key=${index}>${message}</span>`
        : html`<p key=${index}>${message}</p>`;
    }
  };

  const handleCompletionEdit = (e) => {
    session.value.prompt = e.target.innerText;
    session.value.transcript = [];
  };

  return html` <div id="chat" ref=${container} key=${messages.length}>
    <img
      style="width: 60%;${!session.value.image_selected
        ? `display: none;`
        : ``}"
      src="${session.value.image_selected}"
    />
    <span
      contenteditable=${isCompletionMode}
      ref=${container}
      oninput=${handleCompletionEdit}
    >
      ${messages.flatMap(chatLine)}
    </span>
  </div>`;
};

// poor mans markdown replacement
const Markdownish = (params) => {
  const md = params.text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/(^|\n)#{1,6} ([^\n]*)(?=([^`]*`[^`]*`)*[^`]*$)/g, "$1<h3>$2</h3>")
    .replace(/\*\*(.*?)\*\*(?=([^`]*`[^`]*`)*[^`]*$)/g, "<strong>$1</strong>")
    .replace(/__(.*?)__(?=([^`]*`[^`]*`)*[^`]*$)/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*(?=([^`]*`[^`]*`)*[^`]*$)/g, "<em>$1</em>")
    .replace(/_(.*?)_(?=([^`]*`[^`]*`)*[^`]*$)/g, "<em>$1</em>")
    .replace(/```.*?\n([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    .replace(/`(.*?)`/g, "<code>$1</code>")
    .replace(/\n/gim, "<br />");
  return html`<span dangerouslySetInnerHTML=${{ __html: md }} />`;
};

function App(props) {
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("q");
    if (query) chat(query);
  }, []);

  return html`
    <div class="mode-${session.value.type}">
      <main id="content">
        <${ChatLog} />
      </main>

      <section id="write">
        <${MessageInput} />
      </section>
    </div>
  `;
}

render(h(App), document.querySelector("#chatcontainer"));
