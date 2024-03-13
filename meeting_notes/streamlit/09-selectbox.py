import pandas as pd

import streamlit as st
from data import df

option = st.selectbox("Expense type:", df.columns)

"You selected: ", option
