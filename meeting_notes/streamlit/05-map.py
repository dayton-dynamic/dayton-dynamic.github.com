import numpy as np
import pandas as pd

import streamlit as st

DAYTON_LAT_LONG = (39.758949, -84.191605)

map_data = pd.DataFrame(
    np.random.randn(1000, 2) / [50, 50] + DAYTON_LAT_LONG, columns=["lat", "lon"]
)

st.map(map_data)
