import requests   
import bs4

URL = 'http://d8ndl.org/'

def get_mtg_info():
    resp = requests.get(URL)
    if resp.ok:
        soup = bs4.BeautifulSoup(resp.text, features='html.parser')
        mtg_list = soup.body.h3.text 
        return mtg_list 

if __name__ == '__main__':
    print(get_mtg_info())

