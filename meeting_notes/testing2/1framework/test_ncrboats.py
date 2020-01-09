import pytest
from ncrboats import mph


def test_passengers_slow_us_down():
    assert mph(4) < mph(2), "4 passengers should row slower than 2"


def test_takes_two_to_row():
    assert mph(2) > mph(1), "2 passengers should row faster than 1"


def test_no_rowers_no_motion():
    assert mph(0) == 0, "No passengers - boat cannot move"


def test_exact_speed():
    assert mph(2) == 3 - (2 / 3)


# @pytest.mark.skip
def test_natural_numbers():
    with pytest.raises(ValueError):
        mph(-1)
    with pytest.raises(ValueError):
        mph(2.4)
    with pytest.raises(ValueError):
        mph("three hedgehogs in a trenchcoat")
