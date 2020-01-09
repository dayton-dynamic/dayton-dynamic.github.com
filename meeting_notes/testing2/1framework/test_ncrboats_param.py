import pytest
from ncrboats import mph

expected_speeds = [
    (0, 0),
    (1, 1.6666666666666665),
    (2, 2.3333333333333335),
    (3, 2),
    (4, 1.6666666666666667),
    (5, 1.3333333333333335),
    (6, 1),
    (7, 0.666666666666667),
    (8, 0.3333333333333335),
    (9, 0),
    (10, 0),
    (11, 0),
]


@pytest.mark.parametrize("n_passengers, expected_mph", expected_speeds)
def test_speeds(n_passengers, expected_mph):
    assert mph(n_passengers) == expected_mph
