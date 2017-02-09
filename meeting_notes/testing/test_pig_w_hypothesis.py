from pig import latin
from hypothesis import given
from hypothesis.strategies import text

# property-based testing

# https://hypothesis.readthedocs.io/en/latest/quickstart.html

@given(raw=text())
def test_latin_runs_on_text(raw):
    latin(raw)
