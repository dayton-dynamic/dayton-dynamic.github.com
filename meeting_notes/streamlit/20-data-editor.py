import pandas as pd

import streamlit as st

DATAFILE = "restaurants.json"
df = pd.read_json(DATAFILE)
df.index = df.index.set_names("name")
data = st.data_editor(df, num_rows="dynamic")


def save():
    data.to_json(DATAFILE, indent=2)


save = st.button("Save", on_click=save)
