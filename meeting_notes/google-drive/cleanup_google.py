from cmd2 import Cmd 
import jsonlines

from pydrive2.auth import GoogleAuth
from pydrive2.drive import GoogleDrive
from rich import print
from pathlib import Path

gauth = GoogleAuth()
gauth.LocalWebserverAuth()

drive = GoogleDrive(gauth)

DOWNLOAD_DIR = Path("./downloads")
DOWNLOAD_DIR.mkdir(exist_ok=True)


_KEYS_TO_KEEP = 'ownerNames explicitlyTrashed quotaBytesUsed createdDate modifiedDate alternateLink title mimeType id'.split()
def _key_subset(dct):
    return {k: v for k, v in dct.items() if k in _KEYS_TO_KEEP}


class Browser(Cmd):

    PAGE_SIZE = 10

    def __init__(self):

        self.pos = 0
        with jsonlines.open('google-files.jsonl') as reader:
            self.files = [_key_subset(obj['metadata'])
                    for obj in reader
                    if obj['metadata'].get('ownerNames') == ['Catherine Devlin']
                    ]
        for itm in self.files:
            itm['quotaBytesUsed'] = int(itm['quotaBytesUsed'])
        self.files.sort(key=lambda itm: itm['quotaBytesUsed'], reverse=True)
        super().__init__()

    def _show_page(self):
        for (idx, file) in enumerate(self.files[self.pos:self.pos+self.PAGE_SIZE]):
            mod_dt = max(file['createdDate'], file['modifiedDate'])
            kb = f"{round(file['quotaBytesUsed'] / 1024)}K"
            if file['explicitlyTrashed']:
                kb = f"[strike]{kb}[/strike]"
                kb = round(file['quotaBytesUsed'] / 1024)
            print(f"{idx+self.pos:-5} {kb} [purple]{file['title']}[/purple] {mod_dt} {file['alternateLink']}")

    def do_next(self, arg):
        self._show_page()
        self.pos += self.PAGE_SIZE

    def do_prev(self, arg):
        self.pos -= (2 * self.PAGE_SIZE)
        self._show_page()

    def do_list(self, arg):
        self._show_page()

    def _get_file_obj(self, arg):
        target = int(arg)
        file = drive.CreateFile({'id': self.files[target]['id']})
        return file
 
    def do_del(self, arg):
        file = self._get_file_obj(arg) 
        file.Trash()
        file['explicitlyTrashed'] = True

    def do_pull(self, arg):
        "Download (no not delete) numbered file"
        file = self._get_file_obj(arg) 
        filename = file['title'].replace(' ', '-')
        file.GetContentFile(DOWNLOAD_DIR / filename)

    def do_get(self, arg):
        "Download and then delete numbered file"
        file = self.do_pull(arg) 
        file.Trash()
        file['explicitlyTrashed'] = True

if __name__ == '__main__':
    browser = Browser()
    browser.cmdloop()



