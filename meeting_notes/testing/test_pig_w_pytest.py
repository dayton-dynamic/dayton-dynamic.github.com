from pig import latin
import pytest
import tempfile

@pytest.mark.skip
def test_list_input():
    assert latin(['my', 'dog', 'has', 'fleas']) == 'ymay ogday ashay easflay'

def test_type_check():
    with pytest.raises(TypeError):
        latin(3)
    with pytest.raises(TypeError):
        latin([])


@pytest.mark.parametrize("bad_input",
    [None, [], (), {}, 0, 0.0, lambda x: x])
def test_parameterized_type_check(bad_input):
    with pytest.raises(TypeError):
        latin(bad_input)

custom fixture

@pytest.fixture
def textfile():
    file_obj = tempfile.TemporaryFile('w+t')
    file_obj.write("People's Front of Judea")
    file_obj.seek(0)
    return file_obj

def test_read_from_file(textfile):
    file_content = textfile.read()
    assert latin(file_content) == \
        "eople'spay Rontfay of Udeajay"

# standard fixtures

# pytest -q --fixtures

# other goodies

def test_float_arithmetic():
    # assert (1. / 7.4) == (2. / 14.8)
    assert (1. / 7.4) == pytest.approx(2. / 14.8)

# # monkeypatching
