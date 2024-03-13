import pandas as pd

# from data import df
from icecream.icecream import ic

import streamlit as st


@st.cache_data
def get_data():
    ic()
    df = (
        pd.read_csv("dayton_data_snapshot.csv", skiprows=6, index_col=0, thousands=",")
        .drop("Total")
        .transpose()
    )
    df = df[df.index.str.endswith("Actual")]
    df["month"] = pd.to_datetime(df.index.str.removesuffix(" Actual"), format="%B %Y")
    df = df.set_index("month")
    return df


df = get_data()

expense = st.sidebar.selectbox("Budget category", list(df.columns))

start_dt = st.sidebar.slider(
    label="Starting at",
    min_value=df.index.min().to_pydatetime(),
    max_value=df.index.max().to_pydatetime(),
)

ic(start_dt)
ic(expense)
filtered = df[df.index >= start_dt][[expense]]

st.write("Dayton budget")
st.line_chart(filtered)
