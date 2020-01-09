import sys

BASE_SPEED = 3
CHANGE_PER_PASSENGER = 1 / 3


def mph(n_passengers):

    if n_passengers != int(n_passengers):
        raise ValueError("Please do not dismember passengers")
    if n_passengers < 0:
        raise ValueError("# passengers must be >= 0")

    if n_passengers == 0:
        return 0
    result = BASE_SPEED - (CHANGE_PER_PASSENGER * n_passengers)
    if n_passengers < 2:
        result -= 1
    result = max(result, 0) 
    return result


def report(n_passengers):

    n_passengers = int(n_passengers)
    return f"With {n_passengers} passengers: {mph(n_passengers)} mph"


if __name__ == "__main__":

    print(report(sys.argv[1]))
