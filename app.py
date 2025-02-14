import sqlite3
from flask import Flask, jsonify, render_template, Response, request

app = Flask(__name__)

def get_random_quote() -> str:
    conn = sqlite3.connect('database/quotes.db')
    cursor = conn.cursor()

    cursor.execute('SELECT text FROM quotes ORDER BY RANDOM() LIMIT 1') 

    quote = cursor.fetchone()
    conn.close()

    return quote[0] if quote else "No quotes found."

@app.route('/api/quote', methods=['GET'])
def get_quote() -> Response:
    return jsonify({"quote": get_random_quote()})

@app.route('/api/delete', methods=['DELETE'])
def delete_quote() -> Response:
    conn = sqlite3.connect('database/quotes.db')
    cursor = conn.cursor()

    cursor.execute("DELETE FROM quotes")

    conn.commit()
    conn.close()

    return jsonify({"message": "All quotes deleted successfully"}), 200

@app.route('/api/add', methods=['POST'])
def add_quote() -> Response:
    data = request.json
    if not data or "quotes" not in data:
        return jsonify({"error": "Invalid data"}), 400

    conn = sqlite3.connect('database/quotes.db')
    cursor = conn.cursor()

    for quote in data["quotes"]:
        cursor.execute("INSERT INTO quotes (text) VALUES (?)", (quote,))
    
    conn.commit()
    conn.close()

    return jsonify({"message": f"{len(data['quotes'])} quotes added successfully"}), 201

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
