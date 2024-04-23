from flask import Flask
from flask_cors import CORS
from controllers.test_controller import return_london
from flask import jsonify
# Create the Flask app
app = Flask(__name__)
CORS(app) 

@app.route("/try", methods=["GET"])
def london():
    return jsonify(return_london())


# Run the app
if __name__ == '__main__':
    app.run(debug=True)