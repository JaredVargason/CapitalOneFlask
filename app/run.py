from flask import Flask, render_template, jsonify
from config import CAPITAL_ONE_KEY
from pymongo import MongoClient
import json
import requests

app = Flask(__name__)
client = MongoClient()
db = client.test

@app.route('/')
def index():
	return render_template('customers.html')

@app.route('/bank')
def bank():
	return render_template('bank.html')

@app.route('/merchant')
def get_merchant():
	r = requests.get("http://api.reimaginebanking.com/merchants?key=b3ecb3d19e91b8fa639d3f798dbbfaca")
	return json.dumps(r.text)

@app.route('/get_user_transactions')
def get_user_transactions():
	#Get account IDs, customer names from customer (get customer by account ID), purchases on account, and the locations of the purchases from the merchant. money spent, etc.
	r = requests.get("http://")


if __name__ == '__main__':
	app.run(debug=True)
