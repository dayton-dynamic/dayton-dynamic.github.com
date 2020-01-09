from unittest.mock import patch 
from get_mtg_info import get_mtg_info 
import pytest 

# We mock BeautifulSoup here b/c the real thing would 
# fail interpreting the empty response
@patch("get_mtg_info.requests")
@patch("get_mtg_info.bs4.BeautifulSoup")
def test_get_mtg_topic(mocked_bs, mocked_requests):
    result = get_mtg_info()
    mocked_requests.get.assert_called_once()
    mocked_bs.assert_called_once()

# @patch("get_mtg_info.requests")
# def test_get_mtg_topic(mocked_requests):
#     result = get_mtg_info()
#     mocked_requests.get.assert_called_once()

class SuccessResponse:
    text = """
        <body>
        <h2 id="upcoming-meetings">Upcoming Meetings</h2>

        <h3 id="january-2020-testing"><a href="/meeting/2020/01/08/testing.html">January 2020: Testing</a></h3>

        <h4 id="january-08-2020">January 08, 2020</h4>"""
    ok = True 

@patch("get_mtg_info.requests")
def test_get_mtg_topic_successful(mocked_requests):
    mocked_requests.get.return_value = SuccessResponse()
    result = get_mtg_info()
    assert result == 'January 2020: Testing'

class FailedResponse:
    ok = False

@patch("get_mtg_info.requests")
def test_get_mtg_topic_timeout(mocked_requests):
    mocked_requests.get.return_value = FailedResponse 
    result = get_mtg_info 
    assert result is None

from requests.exceptions import Timeout 

@patch("get_mtg_info.requests")
def test_get_mtg_topic_timeout(mocked_requests):
    mocked_requests.get.side_effect = Timeout 
    with pytest.raises(Timeout):
        get_mtg_info()

