import pytest

from pig import latin

def test_pig_latin():
    assert latin('pig') == 'igpay'

@pytest.mark.fail
def test_two_words():
    assert latin('pig latin') == 'igpay atinlay'

if __name__ == '__main__':
    test_pig_latin()
    test_two_words()
