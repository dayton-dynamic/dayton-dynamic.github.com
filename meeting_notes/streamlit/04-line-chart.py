import pandas as pd

import streamlit as st
from data import df

st.write("Dayton budget")
st.line_chart(df)
