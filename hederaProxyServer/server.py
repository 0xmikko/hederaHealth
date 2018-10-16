import json
import requests
import ipfsapi
import base58

from flask import Flask, url_for, request
from flask import jsonify

app = Flask(__name__)

HH_API_HOSTNAME = 'localhost'
HH_API_PORT = '8080'

api = ipfsapi.connect('127.0.0.1', 5001)

JAVA_HOST = '10.23.201.25'
JAVA_PORT = 4000


class Store:
    store_type = 'hashgraph'
    s = 'QmR2AdnauGDehp3BbUoufDJi7vDyG4omsBVbreiaE7hGE7'

    def convertToBytes32(self, hs):
        return base58.b58decode(hs)[2:].hex()

    def convertToHash(self, bs):
        return base58.b58encode(bytes.fromhex('1220' + bs))

    def getFromHashGraph(self):
        r = requests.get('http://{}:{}/get/'.format(JAVA_HOST, JAVA_PORT))
        return self.convertToHash(r.json()['Hash'])

    def setToHashGraph(self, s):
        bs = self.convertToBytes32(s)
        requests.get('http://{}:{}/set/{}'.format(JAVA_HOST, JAVA_PORT, bs))

    def set(self, s):
        if self.store_type == 'local':
            self.s = s
        if self.store_type == 'hashgraph':
            self.setToHashGraph(s)

    def get(self):
        if self.store_type == 'local':
            return self.s
        if self.store_type == 'hashgraph':
            return self.getFromHashGraph()


store = Store()


@app.route('/update-case/', methods=['POST'])
def update_case():
    data = request.get_json()
    s = api.add_json(data)
    store.set(s)
    return jsonify(data)


@app.route('/get-case/')
def get_case():
    s = store.get()
    case = api.get_json(s)
    strategies = json.loads(open('strategies.json').read())
    case['strategies'] = strategies
    return jsonify(case)


@app.route('/get-strategies/')
def get_strategies():
    return open('strategies.json').read()


@app.route('/')
def api_root():
    r = requests.get('http://{}:{}/hello'.format(JAVA_HOST, JAVA_PORT))
    return r.text


if __name__ == '__main__':
    app.run()
