"""
https://www.daytonohio.gov/350/Dayton-Open-Data
"""

import pandas as pd
from icecream.icecream import ic

ic()
df = (
    pd.read_csv("dayton_data_snapshot.csv", skiprows=6, index_col=0, thousands=",")
    .drop("Total")
    .transpose()
)

df = df[df.index.str.endswith("Actual")]
df["month"] = pd.to_datetime(df.index.str.removesuffix(" Actual"), format="%B %Y")
df = df.set_index("month")
