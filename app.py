from flask import Flask, request,jsonify
import pandas as pd

df = pd.read_csv("database.csv")

app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process():
    data = request.get_json()
    value = data.get('value')
    response = {"result": f"Received value: {value}"}
    return jsonify(response)

if __name__ == "__main__":
    app.run(port=5500)