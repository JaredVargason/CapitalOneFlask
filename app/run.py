from flask import Flask, render_template, jsonify, request
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

@app.route('/get_user_purchase_info', methods=['POST', 'GET'])
def get_user_purchase_info():
	#Get account IDs, customer names from customer (get customer by account ID), purchases on account, and the locations of the purchases from the merchant. money spent, etc.
	account_id = request.form['account_id']
	print account_id
	Purchase = db.Purchase
	cursor = Purchase.find({'payer_id':str(account_id)})
	print str(cursor.count())
	for item in cursor:
		print item
		doc = Purchase.find_one({'merchant_id' : item['merchant_id']})
		item['geocode']['lat'] = doc['geocode']['lat']
		item['geocode']['lng'] = doc['geocode']['lng']
		item['name'] = doc['name']

	return dumps(cursor)

@app.route('/get_branches', methods=['GET'])
def get_branches():
	Branch = db.Branch
	cursor = Branch.find()
	return dumps(cursor)

if __name__ == '__main__':	
	app.run(debug=True)