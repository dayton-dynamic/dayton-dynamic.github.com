from get_mtg_info import get_mtg_info 

def test_get_mtg_topic():
    result = get_mtg_info()
    assert '2020' in result