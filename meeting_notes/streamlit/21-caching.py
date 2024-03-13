import pandas as pd
from icecream.icecream import ic

import streamlit as st
from data import df

expense = st.sidebar.selectbox("Budget category", list(df.columns))

start_dt = st.sidebar.slider(
    label="Starting at",
    min_value=df.index.min().to_pydatetime(),
    max_value=df.index.max().to_pydatetime(),
)

ic()
filtered = df[df.index >= start_dt][[expense]]

st.write("Dayton budget")
st.line_chart(filtered)
