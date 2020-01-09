from ncrboats import mph

assert mph(4) < mph(2), "4 passengers should row slower than 2"
assert mph(2) > mph(1), "2 passengers should row faster than 1"
# assert mph(0) == 0, "No passengers - boat cannot move"
# assert mph(2) == 3 - (2 / 3)
assert mph(2) == 2.3333333333333333
