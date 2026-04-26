import urllib.request
from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
        self.capture = False

    def handle_data(self, data):
        stripped = data.strip()
        if stripped:
            self.text.append(stripped)

parser = MyHTMLParser()
html = urllib.request.urlopen("http://localhost:3000/").read().decode("utf-8")
idx = html.find("ACTIVIDADES")
if idx != -1:
    content = html[idx:idx+4000]
    parser.feed(content)
    print("\n".join(parser.text))
else:
    print("ACTIVIDADES section not found")
