from flask import Flask, render_template, request
from database_interface import *

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

#API routes

@app.route('/api/ingredients/', methods=['GET', 'POST'])
@app.route('/api/ingredients/<searchQuery>', methods=['GET'])
def ingredientsAPI(searchQuery=None):
    if request.method == 'GET':
        if searchQuery is None:
            ingredients = ingredientDAO.getAll()
            return

# Application routes

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/<path:path>', methods=['GET'])
def any_root_path(path):
    return render_template('index.html')