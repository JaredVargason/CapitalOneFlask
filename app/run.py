from flask import Flask, render_template
from config import CAPITAL_ONE_KEY
import requests

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('customers.html')

@app.route('/bank')
def bank():
	return render_template('bank.html')

@app.route('/merchant')
def get_merchant():
	r = requests.get("http://api.reimaginebanking.com/merchants?key=b3ecb3d19e91b8fa639d3f798dbbfaca")
	return jsonify(r)


if __name__ == '__main__':
	app.run(debug=True)
