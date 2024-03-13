"passing additional arguments to streamlit functions"

import pandas as pd

import streamlit as st
from data import df

st.write("Dayton budget")
st.dataframe(df.style.highlight_max(axis=0))
