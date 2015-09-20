from flask import Flask, render_template, jsonify
from config import CAPITAL_ONE_KEY
from pymongo import MongoClient
from bson.json_util import dumps
import json
import requests

app = Flask(__name__)
client = MongoClient()
db = client.Capital_DB

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

@app.route('/', methods=['GET'])
def index():
	return render_template('customers.html')

@app.route('/bank', methods=['GET'])
def bank():
	return render_template('bank.html')

@app.route('/merchant', methods=['GET'])
def get_merchant():
	r = requests.get("http://api.reimaginebanking.com/merchants?key=b3ecb3d19e91b8fa639d3f798dbbfaca")
	return json.dumps(r.text)

@app.route('/get_user_transaction_info', methods=['POST', 'GET'])
def get_user_transactions():
	#Get account IDs, customer names from customer (get customer by account ID), purchases on account, and the locations of the purchases from the merchant. money spent, etc.
	Purchase = db.Purchase
	cursor = Purchase.find()
	'''for item in cursor:
		if item['payer_id'] =='hi':
			return "bye"'''

	return "hi"

@app.route('/get_branches', methods=['GET'])
def get_branches():
	Branch = db.Branch
	cursor = Branch.find()
	return dumps(cursor)

if __name__ == '__main__':	
	app.run(debug=True)
