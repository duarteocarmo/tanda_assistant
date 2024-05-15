from datetime import datetime, timedelta

import altair as alt
import numpy
import pandas
from stravalib import Client

DAYS_BACK = 180


def get_tanda_value(km_per_week: int, pace_sec_per_km: int) -> float:
    marathon_distance = 42.195
    marathon_pace_sec_per_km = (
        17.1
        + 140.0 * numpy.exp(-0.0053 * km_per_week)
        + 0.55 * pace_sec_per_km
    )
    total_marathon_time_secs = marathon_distance * marathon_pace_sec_per_km
    total_marathon_time_hours = total_marathon_time_secs / 3600
    return total_marathon_time_hours


def get_pace_for_distance(
    km_per_week: int, total_marathon_time_hours: float
) -> float:
    marathon_distance = 42.195
    marathon_pace_sec_per_km = (
        total_marathon_time_hours * 3600 / marathon_distance
    )
    pace_sec_per_km = (
        marathon_pace_sec_per_km
        - 17.1
        - 140.0 * numpy.exp(-0.0053 * km_per_week)
    ) / 0.55
    return pace_sec_per_km


def pretty_marathon_time(total_marathon_time_hours: float) -> str:
    hours = int(total_marathon_time_hours)
    minutes = int((total_marathon_time_hours - hours) * 60)
    seconds = int(((total_marathon_time_hours - hours) * 60 - minutes) * 60)
    if seconds >= 30:
        minutes += 1

    return f"{hours} hours {minutes} minutes"


def pace_tick_formatter(value):
    minutes = int(value // 60)
    seconds = int(value % 60)
    return f"{minutes}:{seconds:02d}"


def prepare_data(access_token: str) -> dict:
    client = Client(access_token)
    five_months_ago = datetime.now() - timedelta(days=DAYS_BACK)
    activities = client.get_activities(after=five_months_ago.isoformat())
    running_activities = [act for act in activities if act.type == "Run"]

    data = {
        "start_date": [act.start_date for act in running_activities],
        "distance_meters": [float(act.distance) for act in running_activities],
        "time_seconds": [
            act.moving_time.total_seconds() for act in running_activities
        ],
    }

    df = pandas.DataFrame(data)
    df["start_date"] = pandas.to_datetime(df["start_date"])
    df.set_index("start_date", inplace=True)
    weekly_data = df.resample("W").sum()
    weekly_data["distance_km"] = round(
        weekly_data["distance_meters"] / 1000, 1
    )
    upper_limit = (
        weekly_data["distance_km"].mean()
        + 2 * weekly_data["distance_km"].std()
    )

    daily_df = df.groupby(df.index.date).sum()
    daily_df.index = pandas.to_datetime(daily_df.index)
    daily_df.index.name = "date"

    daily_df["tanda_day"] = get_tanda_value(
        daily_df["distance_meters"] / 1000 * 7,
        daily_df["time_seconds"] / (daily_df["distance_meters"] / 1000),
    )
    daily_df["tanda_day_pretty"] = pandas.to_datetime(
        daily_df["tanda_day"], unit="h"
    )

    daily_df = daily_df.reset_index()
    daily_df["date"] = pandas.to_datetime(daily_df["date"])
    daily_df.set_index("date", inplace=True)

    num_weeks = 8
    num_days = num_weeks * 7
    rolling = f"{num_days}d"

    daily_df["rolling_distance_meters"] = (
        daily_df["distance_meters"].rolling(window=rolling).sum()
    )
    daily_df["rolling_time_seconds"] = (
        daily_df["time_seconds"].rolling(window=rolling).sum()
    )

    daily_df["rolling_km_per_week"] = (
        daily_df["rolling_distance_meters"] / 1000 / num_weeks
    )
    daily_df["rolling_pace_sec_per_km"] = (
        daily_df["rolling_time_seconds"]
        / daily_df["rolling_distance_meters"]
        * 1000
    )

    daily_df["rolling_tanda_day"] = get_tanda_value(
        daily_df["rolling_km_per_week"], daily_df["rolling_pace_sec_per_km"]
    )

    daily_df["rolling_tanda_day_pretty"] = pandas.to_datetime(
        daily_df["rolling_tanda_day"], unit="h"
    )

    daily_df["type_rolling"] = "Tanda (8 weeks)"
    daily_df["type_daily"] = "Tanda (daily)"

    daily_df["pace_sec_per_km"] = daily_df["time_seconds"] / (
        daily_df["distance_meters"] / 1000
    )
    daily_df["distance_km"] = daily_df["distance_meters"] / 1000
    daily_df["date_factor"] = daily_df.index.factorize()[0]
    daily_df["daily_pace_pretty"] = daily_df["pace_sec_per_km"].apply(
        lambda x: f"{int(x//60)}:{int(x%60):02d}"
    )
    daily_df["rolling_pace_pretty"] = daily_df[
        "rolling_pace_sec_per_km"
    ].apply(lambda x: f"{int(x//60)}:{int(x%60):02d}")

    daily_df["rolling_km_per_week_daily_distance"] = (
        daily_df["rolling_km_per_week"] / 7
    )
    daily_df["Latest run"] = "Latest run"

    return weekly_data, daily_df, upper_limit


def viz_weekly_chart(
    weekly_data: pandas.DataFrame, upper_limit: float
) -> dict:
    x_scale = alt.Scale(padding=20)
    chart = (
        alt.Chart(weekly_data.reset_index())
        .mark_bar(size=15)
        .encode(
            x=alt.X("start_date:T", scale=x_scale),
            y=alt.Y("distance_km:Q", scale=alt.Scale(domain=[0, upper_limit])),
            tooltip=["start_date", "distance_km"],
        )
    )

    text_labels = (
        alt.Chart(weekly_data.reset_index())
        .mark_text(dy=-10, color="black")
        .encode(
            x=alt.X("start_date:T", scale=x_scale),
            y=alt.Y("distance_km:Q", scale=alt.Scale(domain=[0, upper_limit])),
            text="distance_km:Q",
        )
    )
    weekly_chart = (
        (chart + text_labels)
        .properties(
            width="container",
            height=200,
            title="Running distance per week (km)",
        )
        .interactive()
    )

    return weekly_chart.to_json()


def viz_rolling_tanda(daily_df: pandas.DataFrame) -> dict:
    legend = alt.Legend(title="")

    daily_line = (
        alt.Chart(daily_df.reset_index())
        .mark_point()
        .encode(
            x=alt.X("date:T", title="Date"),
            y=alt.Y("hoursminutes(tanda_day_pretty):O", title="Tanda day"),
            color=alt.Color(
                "type_daily:N",
                legend=legend,
            ),
            tooltip=[
                alt.Tooltip("tanda_day_pretty", timeUnit="hoursminutes"),
                alt.Tooltip("date", timeUnit="yearmonthdate"),
            ],
        )
    )
    rolling_line = (
        alt.Chart(daily_df.reset_index())
        .mark_line()
        .encode(
            x=alt.X("date:T", title="Date"),
            y=alt.Y(
                "hoursminutes(rolling_tanda_day_pretty):O",
                title="Tanda (8 weeks)",
            ),
            color=alt.Color(
                "type_rolling:N",
                legend=legend,
            ),
            tooltip=[
                alt.Tooltip(
                    "rolling_tanda_day_pretty", timeUnit="hoursminutes"
                ),
                alt.Tooltip("date", timeUnit="yearmonthdate"),
            ],
        )
    )

    return (
        (daily_line + rolling_line)
        .properties(
            width="container",
            height=200,
            title="Tanda day vs. 8-week rolling Tanda day",
        )
        .interactive()
        .configure_legend(orient="top")
    ).to_json()


def get_visualizations(access_token: str) -> dict:
    weekly_data, daily_df, upper_limit = prepare_data(access_token)

    return {
        "weekly_chart": viz_weekly_chart(weekly_data, upper_limit),
        "rolling_tanda": viz_rolling_tanda(daily_df=daily_df),
    }
