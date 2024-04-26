from flask import Flask, request, jsonify
from flask_cors import CORS

from flask import jsonify
# Create the Flask app
app = Flask(__name__)
CORS(app) 


@app.route('/preferences', methods=['POST'])
def receive_preferences():
    try:
        data = request.get_json()
        # Process the received data as needed
        print("Received data:", data)
        return jsonify({'message': 'Preferences received successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


# Run the app
if __name__ == '__main__':
    app.run(debug=True)