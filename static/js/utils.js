const t = Symbol.for("preact-signals");

function n() {
  if (r > 1) {
    r--;
    return;
  }
  let t,
    n = !1;
  while (void 0 !== i) {
    let _ = i;
    i = void 0;
    u++;
    while (void 0 !== _) {
      const i = _.o;
      _.o = void 0;
      _.f &= -3;
      if (!(8 & _.f) && h(_))
        try {
          _.c();
        } catch (e) {
          if (!n) {
            t = e;
            n = !0;
          }
        }
      _ = i;
    }
  }
  u = 0;
  r--;
  if (n) throw t;
}

function e(t) {
  if (r > 0) return t();
  r++;
  try {
    return t();
  } finally {
    n();
  }
}
let _, i;

function o(t) {
  const n = _;
  _ = void 0;
  try {
    return t();
  } finally {
    _ = n;
  }
}
let r = 0,
  u = 0,
  l = 0;

function s(t) {
  if (void 0 === _) return;
  let n = t.n;
  if (void 0 === n || n.t !== _) {
    n = {
      i: 0,
      S: t,
      p: _.s,
      n: void 0,
      t: _,
      e: void 0,
      x: void 0,
      r: n,
    };
    if (void 0 !== _.s) _.s.n = n;
    _.s = n;
    t.n = n;
    if (32 & _.f) t.S(n);
    return n;
  } else if (-1 === n.i) {
    n.i = 0;
    if (void 0 !== n.n) {
      n.n.p = n.p;
      if (void 0 !== n.p) n.p.n = n.n;
      n.p = _.s;
      n.n = void 0;
      _.s.n = n;
      _.s = n;
    }
    return n;
  }
}

function f(t) {
  this.v = t;
  this.i = 0;
  this.n = void 0;
  this.t = void 0;
}
f.prototype.brand = t;
f.prototype.h = function () {
  return !0;
};
f.prototype.S = function (t) {
  if (this.t !== t && void 0 === t.e) {
    t.x = this.t;
    if (void 0 !== this.t) this.t.e = t;
    this.t = t;
  }
};
f.prototype.U = function (t) {
  if (void 0 !== this.t) {
    const n = t.e,
      e = t.x;
    if (void 0 !== n) {
      n.x = e;
      t.e = void 0;
    }
    if (void 0 !== e) {
      e.e = n;
      t.x = void 0;
    }
    if (t === this.t) this.t = e;
  }
};
f.prototype.subscribe = function (t) {
  return k(() => {
    const n = this.value,
      e = _;
    _ = void 0;
    try {
      t(n);
    } finally {
      _ = e;
    }
  });
};
f.prototype.valueOf = function () {
  return this.value;
};
f.prototype.toString = function () {
  return this.value + "";
};
f.prototype.toJSON = function () {
  return this.value;
};
f.prototype.peek = function () {
  const t = _;
  _ = void 0;
  try {
    return this.value;
  } finally {
    _ = t;
  }
};
Object.defineProperty(f.prototype, "value", {
  get() {
    const t = s(this);
    if (void 0 !== t) t.i = this.i;
    return this.v;
  },
  set(t) {
    if (t !== this.v) {
      if (u > 100) throw new Error("Cycle detected");
      this.v = t;
      this.i++;
      l++;
      r++;
      try {
        for (let t = this.t; void 0 !== t; t = t.x) t.t.N();
      } finally {
        n();
      }
    }
  },
});

function c(t) {
  return new f(t);
}

function h(t) {
  for (let n = t.s; void 0 !== n; n = n.n)
    if (n.S.i !== n.i || !n.S.h() || n.S.i !== n.i) return !0;
  return !1;
}

function a(t) {
  for (let n = t.s; void 0 !== n; n = n.n) {
    const e = n.S.n;
    if (void 0 !== e) n.r = e;
    n.S.n = n;
    n.i = -1;
    if (void 0 === n.n) {
      t.s = n;
      break;
    }
  }
}

function p(t) {
  let n,
    e = t.s;
  while (void 0 !== e) {
    const t = e.p;
    if (-1 === e.i) {
      e.S.U(e);
      if (void 0 !== t) t.n = e.n;
      if (void 0 !== e.n) e.n.p = t;
    } else n = e;
    e.S.n = e.r;
    if (void 0 !== e.r) e.r = void 0;
    e = t;
  }
  t.s = n;
}

function d(t) {
  f.call(this, void 0);
  this.x = t;
  this.s = void 0;
  this.g = l - 1;
  this.f = 4;
}
(d.prototype = new f()).h = function () {
  this.f &= -3;
  if (1 & this.f) return !1;
  if (32 == (36 & this.f)) return !0;
  this.f &= -5;
  if (this.g === l) return !0;
  this.g = l;
  this.f |= 1;
  if (this.i > 0 && !h(this)) {
    this.f &= -2;
    return !0;
  }
  const t = _;
  try {
    a(this);
    _ = this;
    const t = this.x();
    if (16 & this.f || this.v !== t || 0 === this.i) {
      this.v = t;
      this.f &= -17;
      this.i++;
    }
  } catch (t) {
    this.v = t;
    this.f |= 16;
    this.i++;
  }
  _ = t;
  p(this);
  this.f &= -2;
  return !0;
};
d.prototype.S = function (t) {
  if (void 0 === this.t) {
    this.f |= 36;
    for (let t = this.s; void 0 !== t; t = t.n) t.S.S(t);
  }
  f.prototype.S.call(this, t);
};
d.prototype.U = function (t) {
  if (void 0 !== this.t) {
    f.prototype.U.call(this, t);
    if (void 0 === this.t) {
      this.f &= -33;
      for (let t = this.s; void 0 !== t; t = t.n) t.S.U(t);
    }
  }
};
d.prototype.N = function () {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; void 0 !== t; t = t.x) t.t.N();
  }
};
Object.defineProperty(d.prototype, "value", {
  get() {
    if (1 & this.f) throw new Error("Cycle detected");
    const t = s(this);
    this.h();
    if (void 0 !== t) t.i = this.i;
    if (16 & this.f) throw this.v;
    return this.v;
  },
});

function v(t) {
  return new d(t);
}

function y(t) {
  const e = t.u;
  t.u = void 0;
  if ("function" == typeof e) {
    r++;
    const i = _;
    _ = void 0;
    try {
      e();
    } catch (n) {
      t.f &= -2;
      t.f |= 8;
      m(t);
      throw n;
    } finally {
      _ = i;
      n();
    }
  }
}

function m(t) {
  for (let n = t.s; void 0 !== n; n = n.n) n.S.U(n);
  t.x = void 0;
  t.s = void 0;
  y(t);
}

function g(t) {
  if (_ !== this) throw new Error("Out-of-order effect");
  p(this);
  _ = t;
  this.f &= -2;
  if (8 & this.f) m(this);
  n();
}

function b(t) {
  this.x = t;
  this.u = void 0;
  this.s = void 0;
  this.o = void 0;
  this.f = 32;
}
b.prototype.c = function () {
  const t = this.S();
  try {
    if (8 & this.f) return;
    if (void 0 === this.x) return;
    const n = this.x();
    if ("function" == typeof n) this.u = n;
  } finally {
    t();
  }
};
b.prototype.S = function () {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1;
  this.f &= -9;
  y(this);
  a(this);
  r++;
  const t = _;
  _ = this;
  return g.bind(this, t);
};
b.prototype.N = function () {
  if (!(2 & this.f)) {
    this.f |= 2;
    this.o = i;
    i = this;
  }
};
b.prototype.d = function () {
  this.f |= 8;
  if (!(1 & this.f)) m(this);
};

function k(t) {
  const n = new b(t);
  try {
    n.c();
  } catch (t) {
    n.d();
    throw t;
  }
  return n.d.bind(n);
}
var S,
  w,
  x,
  C,
  E,
  U,
  H,
  P,
  N,
  $,
  D,
  T,
  F = {},
  V = [],
  A = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
  M = Array.isArray;

function W(t, n) {
  for (var e in n) t[e] = n[e];
  return t;
}

function O(t) {
  var n = t.parentNode;
  n && n.removeChild(t);
}

function L(t, n, e) {
  var _,
    i,
    o,
    r = {};
  for (o in n)
    "key" == o ? (_ = n[o]) : "ref" == o ? (i = n[o]) : (r[o] = n[o]);
  if (
    (arguments.length > 2 &&
      (r.children = arguments.length > 3 ? S.call(arguments, 2) : e),
    "function" == typeof t && null != t.defaultProps)
  )
    for (o in t.defaultProps) void 0 === r[o] && (r[o] = t.defaultProps[o]);
  return R(t, r, _, i, null);
}

function R(t, n, e, _, i) {
  var o = {
    type: t,
    props: n,
    key: e,
    ref: _,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    constructor: void 0,
    __v: null == i ? ++x : i,
    __i: -1,
    __u: 0,
  };
  return null == i && null != w.vnode && w.vnode(o), o;
}

function I() {
  return {
    current: null,
  };
}

function j(t) {
  return t.children;
}

function q(t, n) {
  (this.props = t), (this.context = n);
}

function B(t, n) {
  if (null == n) return t.__ ? B(t.__, t.__i + 1) : null;
  for (var e; n < t.__k.length; n++)
    if (null != (e = t.__k[n]) && null != e.__e) return e.__e;
  return "function" == typeof t.type ? B(t) : null;
}

function G(t) {
  var n, e;
  if (null != (t = t.__) && null != t.__c) {
    for (t.__e = t.__c.base = null, n = 0; n < t.__k.length; n++)
      if (null != (e = t.__k[n]) && null != e.__e) {
        t.__e = t.__c.base = e.__e;
        break;
      }
    return G(t);
  }
}

function z(t) {
  ((!t.__d && (t.__d = !0) && E.push(t) && !J.__r++) ||
    U !== w.debounceRendering) &&
    ((U = w.debounceRendering) || H)(J);
}

function J() {
  var t, n, e, _, i, o, r, u;
  for (E.sort(P); (t = E.shift()); )
    t.__d &&
      ((n = E.length),
      (_ = void 0),
      (o = (i = (e = t).__v).__e),
      (r = []),
      (u = []),
      e.__P &&
        (((_ = W({}, i)).__v = i.__v + 1),
        w.vnode && w.vnode(_),
        _t(
          e.__P,
          _,
          i,
          e.__n,
          void 0 !== e.__P.ownerSVGElement,
          32 & i.__u ? [o] : null,
          r,
          null == o ? B(i) : o,
          !!(32 & i.__u),
          u
        ),
        (_.__v = i.__v),
        (_.__.__k[_.__i] = _),
        it(r, _, u),
        _.__e != o && G(_)),
      E.length > n && E.sort(P));
  J.__r = 0;
}

function K(t, n, e, _, i, o, r, u, l, s, f) {
  var c,
    h,
    a,
    p,
    d,
    v = (_ && _.__k) || V,
    y = n.length;
  for (e.__d = l, Q(e, n, v), l = e.__d, c = 0; c < y; c++)
    null != (a = e.__k[c]) &&
      "boolean" != typeof a &&
      "function" != typeof a &&
      ((h = -1 === a.__i ? F : v[a.__i] || F),
      (a.__i = c),
      _t(t, a, h, i, o, r, u, l, s, f),
      (p = a.__e),
      a.ref &&
        h.ref != a.ref &&
        (h.ref && rt(h.ref, null, a), f.push(a.ref, a.__c || p, a)),
      null == d && null != p && (d = p),
      65536 & a.__u || h.__k === a.__k
        ? (l && !l.isConnected && (l = B(h)), (l = X(a, l, t)))
        : "function" == typeof a.type && void 0 !== a.__d
        ? (l = a.__d)
        : p && (l = p.nextSibling),
      (a.__d = void 0),
      (a.__u &= -196609));
  (e.__d = l), (e.__e = d);
}

function Q(t, n, e) {
  var _,
    i,
    o,
    r,
    u,
    l = n.length,
    s = e.length,
    f = s,
    c = 0;
  for (t.__k = [], _ = 0; _ < l; _++)
    (r = _ + c),
      null !=
      (i = t.__k[_] =
        null == (i = n[_]) || "boolean" == typeof i || "function" == typeof i
          ? null
          : "string" == typeof i ||
            "number" == typeof i ||
            "bigint" == typeof i ||
            i.constructor == String
          ? R(null, i, null, null, null)
          : M(i)
          ? R(
              j,
              {
                children: i,
              },
              null,
              null,
              null
            )
          : void 0 === i.constructor && i.__b > 0
          ? R(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v)
          : i)
        ? ((i.__ = t),
          (i.__b = t.__b + 1),
          (u = Z(i, e, r, f)),
          (i.__i = u),
          (o = null),
          -1 !== u && (f--, (o = e[u]) && (o.__u |= 131072)),
          null == o || null === o.__v
            ? (-1 == u && c--, "function" != typeof i.type && (i.__u |= 65536))
            : u !== r &&
              (u === r + 1
                ? c++
                : u > r
                ? f > l - r
                  ? (c += u - r)
                  : c--
                : u < r
                ? u == r - 1 && (c = u - r)
                : (c = 0),
              u !== _ + c && (i.__u |= 65536)))
        : (o = e[r]) &&
          null == o.key &&
          o.__e &&
          0 == (131072 & o.__u) &&
          (o.__e == t.__d && (t.__d = B(o)), ut(o, o, !1), (e[r] = null), f--);
  if (f)
    for (_ = 0; _ < s; _++)
      null != (o = e[_]) &&
        0 == (131072 & o.__u) &&
        (o.__e == t.__d && (t.__d = B(o)), ut(o, o));
}

function X(t, n, e) {
  var _, i;
  if ("function" == typeof t.type) {
    for (_ = t.__k, i = 0; _ && i < _.length; i++)
      _[i] && ((_[i].__ = t), (n = X(_[i], n, e)));
    return n;
  }
  t.__e != n && (e.insertBefore(t.__e, n || null), (n = t.__e));
  do {
    n = n && n.nextSibling;
  } while (null != n && 8 === n.nodeType);
  return n;
}

function Y(t, n) {
  return (
    (n = n || []),
    null == t ||
      "boolean" == typeof t ||
      (M(t)
        ? t.some(function (t) {
            Y(t, n);
          })
        : n.push(t)),
    n
  );
}

function Z(t, n, e, _) {
  var i = t.key,
    o = t.type,
    r = e - 1,
    u = e + 1,
    l = n[e];
  if (null === l || (l && i == l.key && o === l.type && 0 == (131072 & l.__u)))
    return e;
  if (_ > (null != l && 0 == (131072 & l.__u) ? 1 : 0))
    for (; r >= 0 || u < n.length; ) {
      if (r >= 0) {
        if ((l = n[r]) && 0 == (131072 & l.__u) && i == l.key && o === l.type)
          return r;
        r--;
      }
      if (u < n.length) {
        if ((l = n[u]) && 0 == (131072 & l.__u) && i == l.key && o === l.type)
          return u;
        u++;
      }
    }
  return -1;
}

function tt(t, n, e) {
  "-" === n[0]
    ? t.setProperty(n, null == e ? "" : e)
    : (t[n] =
        null == e ? "" : "number" != typeof e || A.test(n) ? e : e + "px");
}

function nt(t, n, e, _, i) {
  var o;
  t: if ("style" === n)
    if ("string" == typeof e) t.style.cssText = e;
    else {
      if (("string" == typeof _ && (t.style.cssText = _ = ""), _))
        for (n in _) (e && n in e) || tt(t.style, n, "");
      if (e) for (n in e) (_ && e[n] === _[n]) || tt(t.style, n, e[n]);
    }
  else if ("o" === n[0] && "n" === n[1])
    (o = n !== (n = n.replace(/(PointerCapture)$|Capture$/i, "$1"))),
      (n =
        n.toLowerCase() in t || "onFocusOut" === n || "onFocusIn" === n
          ? n.toLowerCase().slice(2)
          : n.slice(2)),
      t.l || (t.l = {}),
      (t.l[n + o] = e),
      e
        ? _
          ? (e.u = _.u)
          : ((e.u = N), t.addEventListener(n, o ? D : $, o))
        : t.removeEventListener(n, o ? D : $, o);
  else {
    if (i) n = n.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (
      "width" != n &&
      "height" != n &&
      "href" != n &&
      "list" != n &&
      "form" != n &&
      "tabIndex" != n &&
      "download" != n &&
      "rowSpan" != n &&
      "colSpan" != n &&
      "role" != n &&
      n in t
    )
      try {
        t[n] = null == e ? "" : e;
        break t;
      } catch (t) {}
    "function" == typeof e ||
      (null == e || (!1 === e && "-" !== n[4])
        ? t.removeAttribute(n)
        : t.setAttribute(n, e));
  }
}

function et(t) {
  return function (n) {
    if (this.l) {
      var e = this.l[n.type + t];
      if (null == n.t) n.t = N++;
      else if (n.t < e.u) return;
      return e(w.event ? w.event(n) : n);
    }
  };
}

function _t(t, n, e, _, i, o, r, u, l, s) {
  var f,
    c,
    h,
    a,
    p,
    d,
    v,
    y,
    m,
    g,
    b,
    k,
    S,
    x,
    C,
    E = n.type;
  if (void 0 !== n.constructor) return null;
  128 & e.__u && ((l = !!(32 & e.__u)), (o = [(u = n.__e = e.__e)])),
    (f = w.__b) && f(n);
  t: if ("function" == typeof E)
    try {
      if (
        ((y = n.props),
        (m = (f = E.contextType) && _[f.__c]),
        (g = f ? (m ? m.props.value : f.__) : _),
        e.__c
          ? (v = (c = n.__c = e.__c).__ = c.__E)
          : ("prototype" in E && E.prototype.render
              ? (n.__c = c = new E(y, g))
              : ((n.__c = c = new q(y, g)),
                (c.constructor = E),
                (c.render = lt)),
            m && m.sub(c),
            (c.props = y),
            c.state || (c.state = {}),
            (c.context = g),
            (c.__n = _),
            (h = c.__d = !0),
            (c.__h = []),
            (c._sb = [])),
        null == c.__s && (c.__s = c.state),
        null != E.getDerivedStateFromProps &&
          (c.__s == c.state && (c.__s = W({}, c.__s)),
          W(c.__s, E.getDerivedStateFromProps(y, c.__s))),
        (a = c.props),
        (p = c.state),
        (c.__v = n),
        h)
      )
        null == E.getDerivedStateFromProps &&
          null != c.componentWillMount &&
          c.componentWillMount(),
          null != c.componentDidMount && c.__h.push(c.componentDidMount);
      else {
        if (
          (null == E.getDerivedStateFromProps &&
            y !== a &&
            null != c.componentWillReceiveProps &&
            c.componentWillReceiveProps(y, g),
          !c.__e &&
            ((null != c.shouldComponentUpdate &&
              !1 === c.shouldComponentUpdate(y, c.__s, g)) ||
              n.__v === e.__v))
        ) {
          for (
            n.__v !== e.__v && ((c.props = y), (c.state = c.__s), (c.__d = !1)),
              n.__e = e.__e,
              n.__k = e.__k,
              n.__k.forEach(function (t) {
                t && (t.__ = n);
              }),
              b = 0;
            b < c._sb.length;
            b++
          )
            c.__h.push(c._sb[b]);
          (c._sb = []), c.__h.length && r.push(c);
          break t;
        }
        null != c.componentWillUpdate && c.componentWillUpdate(y, c.__s, g),
          null != c.componentDidUpdate &&
            c.__h.push(function () {
              c.componentDidUpdate(a, p, d);
            });
      }
      if (
        ((c.context = g),
        (c.props = y),
        (c.__P = t),
        (c.__e = !1),
        (k = w.__r),
        (S = 0),
        "prototype" in E && E.prototype.render)
      ) {
        for (
          c.state = c.__s,
            c.__d = !1,
            k && k(n),
            f = c.render(c.props, c.state, c.context),
            x = 0;
          x < c._sb.length;
          x++
        )
          c.__h.push(c._sb[x]);
        c._sb = [];
      } else
        do {
          (c.__d = !1),
            k && k(n),
            (f = c.render(c.props, c.state, c.context)),
            (c.state = c.__s);
        } while (c.__d && ++S < 25);
      (c.state = c.__s),
        null != c.getChildContext && (_ = W(W({}, _), c.getChildContext())),
        h ||
          null == c.getSnapshotBeforeUpdate ||
          (d = c.getSnapshotBeforeUpdate(a, p)),
        K(
          t,
          M(
            (C =
              null != f && f.type === j && null == f.key ? f.props.children : f)
          )
            ? C
            : [C],
          n,
          e,
          _,
          i,
          o,
          r,
          u,
          l,
          s
        ),
        (c.base = n.__e),
        (n.__u &= -161),
        c.__h.length && r.push(c),
        v && (c.__E = c.__ = null);
    } catch (t) {
      (n.__v = null),
        l || null != o
          ? ((n.__e = u), (n.__u |= l ? 160 : 32), (o[o.indexOf(u)] = null))
          : ((n.__e = e.__e), (n.__k = e.__k)),
        w.__e(t, n, e);
    }
  else
    null == o && n.__v === e.__v
      ? ((n.__k = e.__k), (n.__e = e.__e))
      : (n.__e = ot(e.__e, n, e, _, i, o, r, l, s));
  (f = w.diffed) && f(n);
}

function it(t, n, e) {
  n.__d = void 0;
  for (var _ = 0; _ < e.length; _++) rt(e[_], e[++_], e[++_]);
  w.__c && w.__c(n, t),
    t.some(function (n) {
      try {
        (t = n.__h),
          (n.__h = []),
          t.some(function (t) {
            t.call(n);
          });
      } catch (t) {
        w.__e(t, n.__v);
      }
    });
}

function ot(t, n, e, _, i, o, r, u, l) {
  var s,
    f,
    c,
    h,
    a,
    p,
    d,
    v = e.props,
    y = n.props,
    m = n.type;
  if (("svg" === m && (i = !0), null != o))
    for (s = 0; s < o.length; s++)
      if (
        (a = o[s]) &&
        "setAttribute" in a == !!m &&
        (m ? a.localName === m : 3 === a.nodeType)
      ) {
        (t = a), (o[s] = null);
        break;
      }
  if (null == t) {
    if (null === m) return document.createTextNode(y);
    (t = i
      ? document.createElementNS("http://www.w3.org/2000/svg", m)
      : document.createElement(m, y.is && y)),
      (o = null),
      (u = !1);
  }
  if (null === m) v === y || (u && t.data === y) || (t.data = y);
  else {
    if (((o = o && S.call(t.childNodes)), (v = e.props || F), !u && null != o))
      for (v = {}, s = 0; s < t.attributes.length; s++)
        v[(a = t.attributes[s]).name] = a.value;
    for (s in v)
      (a = v[s]),
        "children" == s ||
          ("dangerouslySetInnerHTML" == s
            ? (c = a)
            : "key" === s || s in y || nt(t, s, null, a, i));
    for (s in y)
      (a = y[s]),
        "children" == s
          ? (h = a)
          : "dangerouslySetInnerHTML" == s
          ? (f = a)
          : "value" == s
          ? (p = a)
          : "checked" == s
          ? (d = a)
          : "key" === s ||
            (u && "function" != typeof a) ||
            v[s] === a ||
            nt(t, s, a, v[s], i);
    if (f)
      u ||
        (c && (f.__html === c.__html || f.__html === t.innerHTML)) ||
        (t.innerHTML = f.__html),
        (n.__k = []);
    else if (
      (c && (t.innerHTML = ""),
      K(
        t,
        M(h) ? h : [h],
        n,
        e,
        _,
        i && "foreignObject" !== m,
        o,
        r,
        o ? o[0] : e.__k && B(e, 0),
        u,
        l
      ),
      null != o)
    )
      for (s = o.length; s--; ) null != o[s] && O(o[s]);
    u ||
      ((s = "value"),
      void 0 !== p &&
        (p !== t[s] ||
          ("progress" === m && !p) ||
          ("option" === m && p !== v[s])) &&
        nt(t, s, p, v[s], !1),
      (s = "checked"),
      void 0 !== d && d !== t[s] && nt(t, s, d, v[s], !1));
  }
  return t;
}

function rt(t, n, e) {
  try {
    "function" == typeof t ? t(n) : (t.current = n);
  } catch (t) {
    w.__e(t, e);
  }
}

function ut(t, n, e) {
  var _, i;
  if (
    (w.unmount && w.unmount(t),
    (_ = t.ref) && ((_.current && _.current !== t.__e) || rt(_, null, n)),
    null != (_ = t.__c))
  ) {
    if (_.componentWillUnmount)
      try {
        _.componentWillUnmount();
      } catch (t) {
        w.__e(t, n);
      }
    _.base = _.__P = null;
  }
  if ((_ = t.__k))
    for (i = 0; i < _.length; i++)
      _[i] && ut(_[i], n, e || "function" != typeof t.type);
  e || null == t.__e || O(t.__e), (t.__c = t.__ = t.__e = t.__d = void 0);
}

function lt(t, n, e) {
  return this.constructor(t, e);
}

function st(t, n, e) {
  var _, i, o, r;
  w.__ && w.__(t, n),
    (i = (_ = "function" == typeof e) ? null : (e && e.__k) || n.__k),
    (o = []),
    (r = []),
    _t(
      n,
      (t = ((!_ && e) || n).__k = L(j, null, [t])),
      i || F,
      F,
      void 0 !== n.ownerSVGElement,
      !_ && e ? [e] : i ? null : n.firstChild ? S.call(n.childNodes) : null,
      o,
      !_ && e ? e : i ? i.__e : n.firstChild,
      _,
      r
    ),
    it(o, t, r);
}

function ft(t, n) {
  st(t, n, ft);
}

function ct(t, n, e) {
  var _,
    i,
    o,
    r,
    u = W({}, t.props);
  for (o in (t.type && t.type.defaultProps && (r = t.type.defaultProps), n))
    "key" == o
      ? (_ = n[o])
      : "ref" == o
      ? (i = n[o])
      : (u[o] = void 0 === n[o] && void 0 !== r ? r[o] : n[o]);
  return (
    arguments.length > 2 &&
      (u.children = arguments.length > 3 ? S.call(arguments, 2) : e),
    R(t.type, u, _ || t.key, i || t.ref, null)
  );
}

function ht(t, n) {
  var e = {
    __c: (n = "__cC" + T++),
    __: t,
    Consumer: function (t, n) {
      return t.children(n);
    },
    Provider: function (t) {
      var e, _;
      return (
        this.getChildContext ||
          ((e = []),
          ((_ = {})[n] = this),
          (this.getChildContext = function () {
            return _;
          }),
          (this.shouldComponentUpdate = function (t) {
            this.props.value !== t.value &&
              e.some(function (t) {
                (t.__e = !0), z(t);
              });
          }),
          (this.sub = function (t) {
            e.push(t);
            var n = t.componentWillUnmount;
            t.componentWillUnmount = function () {
              e.splice(e.indexOf(t), 1), n && n.call(t);
            };
          })),
        t.children
      );
    },
  };
  return (e.Provider.__ = e.Consumer.contextType = e);
}
(S = V.slice),
  (w = {
    __e: function (t, n, e, _) {
      for (var i, o, r; (n = n.__); )
        if ((i = n.__c) && !i.__)
          try {
            if (
              ((o = i.constructor) &&
                null != o.getDerivedStateFromError &&
                (i.setState(o.getDerivedStateFromError(t)), (r = i.__d)),
              null != i.componentDidCatch &&
                (i.componentDidCatch(t, _ || {}), (r = i.__d)),
              r)
            )
              return (i.__E = i);
          } catch (n) {
            t = n;
          }
      throw t;
    },
  }),
  (x = 0),
  (C = function (t) {
    return null != t && null == t.constructor;
  }),
  (q.prototype.setState = function (t, n) {
    var e;
    (e =
      null != this.__s && this.__s !== this.state
        ? this.__s
        : (this.__s = W({}, this.state))),
      "function" == typeof t && (t = t(W({}, e), this.props)),
      t && W(e, t),
      null != t && this.__v && (n && this._sb.push(n), z(this));
  }),
  (q.prototype.forceUpdate = function (t) {
    this.__v && ((this.__e = !0), t && this.__h.push(t), z(this));
  }),
  (q.prototype.render = j),
  (E = []),
  (H =
    "function" == typeof Promise
      ? Promise.prototype.then.bind(Promise.resolve())
      : setTimeout),
  (P = function (t, n) {
    return t.__v.__b - n.__v.__b;
  }),
  (J.__r = 0),
  (N = 0),
  ($ = et(!1)),
  (D = et(!0)),
  (T = 0);
var at,
  pt,
  dt,
  vt,
  yt = 0,
  mt = [],
  gt = [],
  bt = w,
  kt = bt.__b,
  St = bt.__r,
  wt = bt.diffed,
  xt = bt.__c,
  Ct = bt.unmount,
  Et = bt.__;

function Ut(t, n) {
  bt.__h && bt.__h(pt, t, yt || n), (yt = 0);
  var e =
    pt.__H ||
    (pt.__H = {
      __: [],
      __h: [],
    });
  return (
    t >= e.__.length &&
      e.__.push({
        __V: gt,
      }),
    e.__[t]
  );
}

function Ht(t) {
  return (yt = 1), Pt(Gt, t);
}

function Pt(t, n, e) {
  var _ = Ut(at++, 2);
  if (
    ((_.t = t),
    !_.__c &&
      ((_.__ = [
        e ? e(n) : Gt(void 0, n),
        function (t) {
          var n = _.__N ? _.__N[0] : _.__[0],
            e = _.t(n, t);
          n !== e && ((_.__N = [e, _.__[1]]), _.__c.setState({}));
        },
      ]),
      (_.__c = pt),
      !pt.u))
  ) {
    var i = function (t, n, e) {
      if (!_.__c.__H) return !0;
      var i = _.__c.__H.__.filter(function (t) {
        return !!t.__c;
      });
      if (
        i.every(function (t) {
          return !t.__N;
        })
      )
        return !o || o.call(this, t, n, e);
      var r = !1;
      return (
        i.forEach(function (t) {
          if (t.__N) {
            var n = t.__[0];
            (t.__ = t.__N), (t.__N = void 0), n !== t.__[0] && (r = !0);
          }
        }),
        !(!r && _.__c.props === t) && (!o || o.call(this, t, n, e))
      );
    };
    pt.u = !0;
    var o = pt.shouldComponentUpdate,
      r = pt.componentWillUpdate;
    (pt.componentWillUpdate = function (t, n, e) {
      if (this.__e) {
        var _ = o;
        (o = void 0), i(t, n, e), (o = _);
      }
      r && r.call(this, t, n, e);
    }),
      (pt.shouldComponentUpdate = i);
  }
  return _.__N || _.__;
}

function Nt(t, n) {
  var e = Ut(at++, 3);
  !bt.__s && Bt(e.__H, n) && ((e.__ = t), (e.i = n), pt.__H.__h.push(e));
}

function $t(t, n) {
  var e = Ut(at++, 4);
  !bt.__s && Bt(e.__H, n) && ((e.__ = t), (e.i = n), pt.__h.push(e));
}

function Dt(t) {
  return (
    (yt = 5),
    Ft(function () {
      return {
        current: t,
      };
    }, [])
  );
}

function Tt(t, n, e) {
  (yt = 6),
    $t(
      function () {
        return "function" == typeof t
          ? (t(n()),
            function () {
              return t(null);
            })
          : t
          ? ((t.current = n()),
            function () {
              return (t.current = null);
            })
          : void 0;
      },
      null == e ? e : e.concat(t)
    );
}

function Ft(t, n) {
  var e = Ut(at++, 7);
  return Bt(e.__H, n) ? ((e.__V = t()), (e.i = n), (e.__h = t), e.__V) : e.__;
}

function Vt(t, n) {
  return (
    (yt = 8),
    Ft(function () {
      return t;
    }, n)
  );
}

function At(t) {
  var n = pt.context[t.__c],
    e = Ut(at++, 9);
  return (
    (e.c = t),
    n ? (null == e.__ && ((e.__ = !0), n.sub(pt)), n.props.value) : t.__
  );
}

function Mt(t, n) {
  bt.useDebugValue && bt.useDebugValue(n ? n(t) : t);
}

function Wt(t) {
  var n = Ut(at++, 10),
    e = Ht();
  return (
    (n.__ = t),
    pt.componentDidCatch ||
      (pt.componentDidCatch = function (t, _) {
        n.__ && n.__(t, _), e[1](t);
      }),
    [
      e[0],
      function () {
        e[1](void 0);
      },
    ]
  );
}

function Ot() {
  var t = Ut(at++, 11);
  if (!t.__) {
    for (var n = pt.__v; null !== n && !n.__m && null !== n.__; ) n = n.__;
    var e = n.__m || (n.__m = [0, 0]);
    t.__ = "P" + e[0] + "-" + e[1]++;
  }
  return t.__;
}

function Lt() {
  for (var t; (t = mt.shift()); )
    if (t.__P && t.__H)
      try {
        t.__H.__h.forEach(jt), t.__H.__h.forEach(qt), (t.__H.__h = []);
      } catch (n) {
        (t.__H.__h = []), bt.__e(n, t.__v);
      }
}
(bt.__b = function (t) {
  (pt = null), kt && kt(t);
}),
  (bt.__ = function (t, n) {
    t && n.__k && n.__k.__m && (t.__m = n.__k.__m), Et && Et(t, n);
  }),
  (bt.__r = function (t) {
    St && St(t), (at = 0);
    var n = (pt = t.__c).__H;
    n &&
      (dt === pt
        ? ((n.__h = []),
          (pt.__h = []),
          n.__.forEach(function (t) {
            t.__N && (t.__ = t.__N), (t.__V = gt), (t.__N = t.i = void 0);
          }))
        : (n.__h.forEach(jt), n.__h.forEach(qt), (n.__h = []), (at = 0))),
      (dt = pt);
  }),
  (bt.diffed = function (t) {
    wt && wt(t);
    var n = t.__c;
    n &&
      n.__H &&
      (n.__H.__h.length &&
        ((1 !== mt.push(n) && vt === bt.requestAnimationFrame) ||
          ((vt = bt.requestAnimationFrame) || It)(Lt)),
      n.__H.__.forEach(function (t) {
        t.i && (t.__H = t.i),
          t.__V !== gt && (t.__ = t.__V),
          (t.i = void 0),
          (t.__V = gt);
      })),
      (dt = pt = null);
  }),
  (bt.__c = function (t, n) {
    n.some(function (t) {
      try {
        t.__h.forEach(jt),
          (t.__h = t.__h.filter(function (t) {
            return !t.__ || qt(t);
          }));
      } catch (r) {
        n.some(function (t) {
          t.__h && (t.__h = []);
        }),
          (n = []),
          bt.__e(r, t.__v);
      }
    }),
      xt && xt(t, n);
  }),
  (bt.unmount = function (t) {
    Ct && Ct(t);
    var n,
      e = t.__c;
    e &&
      e.__H &&
      (e.__H.__.forEach(function (t) {
        try {
          jt(t);
        } catch (t) {
          n = t;
        }
      }),
      (e.__H = void 0),
      n && bt.__e(n, e.__v));
  });
var Rt = "function" == typeof requestAnimationFrame;

function It(t) {
  var n,
    e = function () {
      clearTimeout(_), Rt && cancelAnimationFrame(n), setTimeout(t);
    },
    _ = setTimeout(e, 100);
  Rt && (n = requestAnimationFrame(e));
}

function jt(t) {
  var n = pt,
    e = t.__c;
  "function" == typeof e && ((t.__c = void 0), e()), (pt = n);
}

function qt(t) {
  var n = pt;
  (t.__c = t.__()), (pt = n);
}

function Bt(t, n) {
  return (
    !t ||
    t.length !== n.length ||
    n.some(function (n, e) {
      return n !== t[e];
    })
  );
}

function Gt(t, n) {
  return "function" == typeof n ? n(t) : n;
}

function zt(t, n) {
  w[t] = n.bind(null, w[t] || (() => {}));
}
let Jt, Kt;

function Qt(t) {
  if (Kt) Kt();
  Kt = t && t.S();
}

function Xt({ data: t }) {
  const n = Zt(t);
  n.value = t;
  const e = Ft(() => {
    let t = this.__v;
    while ((t = t.__))
      if (t.__c) {
        t.__c.__$f |= 4;
        break;
      }
    this.__$u.c = () => {
      var t;
      if (!C(e.peek()) && 3 === (null == (t = this.base) ? void 0 : t.nodeType))
        this.base.data = e.peek();
      else {
        this.__$f |= 1;
        this.setState({});
      }
    };
    return v(() => {
      let t = n.value.value;
      return 0 === t ? 0 : !0 === t ? "" : t || "";
    });
  }, []);
  return e.value;
}
Xt.displayName = "_st";
Object.defineProperties(f.prototype, {
  constructor: {
    configurable: !0,
    value: void 0,
  },
  type: {
    configurable: !0,
    value: Xt,
  },
  props: {
    configurable: !0,
    get() {
      return {
        data: this,
      };
    },
  },
  __b: {
    configurable: !0,
    value: 1,
  },
});
zt("__b", (t, n) => {
  if ("string" == typeof n.type) {
    let t,
      e = n.props;
    for (let _ in e) {
      if ("children" === _) continue;
      let i = e[_];
      if (i instanceof f) {
        if (!t) n.__np = t = {};
        t[_] = i;
        e[_] = i.peek();
      }
    }
  }
  t(n);
});
zt("__r", (t, n) => {
  Qt();
  let e,
    _ = n.__c;
  if (_) {
    _.__$f &= -2;
    e = _.__$u;
    if (void 0 === e)
      _.__$u = e = (function (t) {
        let n;
        k(function () {
          n = this;
        });
        n.c = () => {
          _.__$f |= 1;
          _.setState({});
        };
        return n;
      })();
  }
  Jt = _;
  Qt(e);
  t(n);
});
zt("__e", (t, n, e, _) => {
  Qt();
  Jt = void 0;
  t(n, e, _);
});
zt("diffed", (t, n) => {
  Qt();
  Jt = void 0;
  let e;
  if ("string" == typeof n.type && (e = n.__e)) {
    let t = n.__np,
      _ = n.props;
    if (t) {
      let n = e.U;
      if (n)
        for (let e in n) {
          let _ = n[e];
          if (void 0 !== _ && !(e in t)) {
            _.d();
            n[e] = void 0;
          }
        }
      else {
        n = {};
        e.U = n;
      }
      for (let i in t) {
        let o = n[i],
          r = t[i];
        if (void 0 === o) {
          o = Yt(e, i, r, _);
          n[i] = o;
        } else o.o(r, _);
      }
    }
  }
  t(n);
});

function Yt(t, n, e, _) {
  const i = n in t && void 0 === t.ownerSVGElement,
    o = c(e);
  return {
    o: (t, n) => {
      o.value = t;
      _ = n;
    },
    d: k(() => {
      const e = o.value.value;
      if (_[n] !== e) {
        _[n] = e;
        if (i) t[n] = e;
        else if (e) t.setAttribute(n, e);
        else t.removeAttribute(n);
      }
    }),
  };
}
zt("unmount", (t, n) => {
  if ("string" == typeof n.type) {
    let t = n.__e;
    if (t) {
      const n = t.U;
      if (n) {
        t.U = void 0;
        for (let t in n) {
          let e = n[t];
          if (e) e.d();
        }
      }
    }
  } else {
    let t = n.__c;
    if (t) {
      const n = t.__$u;
      if (n) {
        t.__$u = void 0;
        n.d();
      }
    }
  }
  t(n);
});
zt("__h", (t, n, e, _) => {
  if (_ < 3 || 9 === _) n.__$f |= 2;
  t(n, e, _);
});
q.prototype.shouldComponentUpdate = function (t, n) {
  const e = this.__$u;
  if (!((e && void 0 !== e.s) || 4 & this.__$f)) return !0;
  if (3 & this.__$f) return !0;
  for (let _ in n) return !0;
  for (let _ in t) if ("__source" !== _ && t[_] !== this.props[_]) return !0;
  for (let _ in this.props) if (!(_ in t)) return !0;
  return !1;
};

function Zt(t) {
  return Ft(() => c(t), []);
}

function tn(t) {
  const n = Dt(t);
  n.current = t;
  Jt.__$f |= 4;
  return Ft(() => v(() => n.current()), []);
}

function nn(t) {
  const n = Dt(t);
  n.current = t;
  Nt(() => k(() => n.current()), []);
}
var en = function (t, n, e, _) {
    var i;
    n[0] = 0;
    for (var o = 1; o < n.length; o++) {
      var r = n[o++],
        u = n[o] ? ((n[0] |= r ? 1 : 2), e[n[o++]]) : n[++o];
      3 === r
        ? (_[0] = u)
        : 4 === r
        ? (_[1] = Object.assign(_[1] || {}, u))
        : 5 === r
        ? ((_[1] = _[1] || {})[n[++o]] = u)
        : 6 === r
        ? (_[1][n[++o]] += u + "")
        : r
        ? ((i = t.apply(u, en(t, u, e, ["", null]))),
          _.push(i),
          u[0] ? (n[0] |= 2) : ((n[o - 2] = 0), (n[o] = i)))
        : _.push(u);
    }
    return _;
  },
  _n = new Map();

function on(t) {
  var n = _n.get(this);
  return (
    n || ((n = new Map()), _n.set(this, n)),
    (n = en(
      this,
      n.get(t) ||
        (n.set(
          t,
          (n = (function (t) {
            for (
              var n,
                e,
                _ = 1,
                i = "",
                o = "",
                r = [0],
                u = function (t) {
                  1 === _ && (t || (i = i.replace(/^\s*\n\s*|\s*\n\s*$/g, "")))
                    ? r.push(0, t, i)
                    : 3 === _ && (t || i)
                    ? (r.push(3, t, i), (_ = 2))
                    : 2 === _ && "..." === i && t
                    ? r.push(4, t, 0)
                    : 2 === _ && i && !t
                    ? r.push(5, 0, !0, i)
                    : _ >= 5 &&
                      ((i || (!t && 5 === _)) && (r.push(_, 0, i, e), (_ = 6)),
                      t && (r.push(_, t, 0, e), (_ = 6))),
                    (i = "");
                },
                l = 0;
              l < t.length;
              l++
            ) {
              l && (1 === _ && u(), u(l));
              for (var s = 0; s < t[l].length; s++)
                (n = t[l][s]),
                  1 === _
                    ? "<" === n
                      ? (u(), (r = [r]), (_ = 3))
                      : (i += n)
                    : 4 === _
                    ? "--" === i && ">" === n
                      ? ((_ = 1), (i = ""))
                      : (i = n + i[0])
                    : o
                    ? n === o
                      ? (o = "")
                      : (i += n)
                    : '"' === n || "'" === n
                    ? (o = n)
                    : ">" === n
                    ? (u(), (_ = 1))
                    : _ &&
                      ("=" === n
                        ? ((_ = 5), (e = i), (i = ""))
                        : "/" === n && (_ < 5 || ">" === t[l][s + 1])
                        ? (u(),
                          3 === _ && (r = r[0]),
                          (_ = r),
                          (r = r[0]).push(2, 0, _),
                          (_ = 0))
                        : " " === n || "\t" === n || "\n" === n || "\r" === n
                        ? (u(), (_ = 2))
                        : (i += n)),
                  3 === _ && "!--" === i && ((_ = 4), (r = r[0]));
            }
            return u(), r;
          })(t))
        ),
        n),
      arguments,
      []
    )).length > 1
      ? n
      : n[0]
  );
}
var rn = on.bind(L);
export {
  q as Component,
  j as Fragment,
  f as Signal,
  e as batch,
  ct as cloneElement,
  v as computed,
  ht as createContext,
  L as createElement,
  I as createRef,
  k as effect,
  L as h,
  rn as html,
  ft as hydrate,
  C as isValidElement,
  w as options,
  st as render,
  c as signal,
  Y as toChildArray,
  o as untracked,
  Vt as useCallback,
  tn as useComputed,
  At as useContext,
  Mt as useDebugValue,
  Nt as useEffect,
  Wt as useErrorBoundary,
  Ot as useId,
  Tt as useImperativeHandle,
  $t as useLayoutEffect,
  Ft as useMemo,
  Pt as useReducer,
  Dt as useRef,
  Zt as useSignal,
  nn as useSignalEffect,
  Ht as useState,
};
