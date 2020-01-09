import sys

BASE_SPEED = 3
CHANGE_PER_PASSENGER = 1 / 3


def mph(n_passengers):

    assert isinstance(n_passengers, int), "integer # of passengers only please"
    assert n_passengers < 20, "no way too many passengers" 

    result = BASE_SPEED - (CHANGE_PER_PASSENGER * n_passengers)
    if n_passengers < 2:
        result -= 1
    return result


def report(n_passengers):

    n_passengers = int(n_passengers)
    return f"With {n_passengers} passengers: {mph(n_passengers)} mph"



if __name__ == "__main__":

    print(report(sys.argv[1]))
