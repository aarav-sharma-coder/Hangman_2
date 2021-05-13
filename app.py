from flask import Flask,render_template, jsonify, request
import random

app = Flask(__name__)

templates = [
    {
        "inputs": 7,
        "category": "It is the most popular sport in India.",
        "word": "Cricket"
    },
    {
        "inputs": 6,
        "category": " It is an european Country.",
        "word": "France"
    },

    {
        "inputs":  6,
        "category": "It is the most popular programming language.",
        "word": "Python"
    }

]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get_template")
def get_template():
    return jsonify({
        "status": "success",
        "word": random.choice(templates)
    })

if __name__ == "__main__":
    app.run()
