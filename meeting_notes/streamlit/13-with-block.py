import pandas as pd

import streamlit as st
from data import df

left_column, right_column = st.columns(2)

expense = left_column.selectbox("Budget category", list(df.columns))

start_dt = left_column.slider(
    label="Starting at",
    min_value=df.index.min().to_pydatetime(),
    max_value=df.index.max().to_pydatetime(),
)

filtered = df[df.index >= start_dt][[expense]]

right_column.write("Dayton budget")
right_column.line_chart(filtered)
