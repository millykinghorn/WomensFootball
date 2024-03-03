from flask import Flask, jsonify, render_template, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample data for 100 football players
players_data = [
    {"id": 1, "name": "Player 1", "goals": 10, "assists": 5},
    {"id": 2, "name": "Player 2", "goals": 8, "assists": 7},
    # Add more player data here...
]

@app.route('/')
def home():
    return render_template('index.html', title='Home')

@app.route('/players', methods=['GET'])
def get_players():
    return jsonify(players_data)

if __name__ == '__main__':
    app.run(debug=True)