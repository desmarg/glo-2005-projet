from flask import Flask, render_template, request, jsonify
from database_interface import *

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

#API routes

@app.route('/api/ingredients', strict_slashes=False, methods=['GET', 'POST'])
def ingredientsAPI():
    if request.method == 'GET':
        searchQuery = request.args.get('search')
        print(searchQuery)
        if searchQuery is None:
            ingredients = ingredientDAO.getAll()
        else:
            ingredients = ingredientDAO.searchByName(searchQuery)
        arrayToSerialize = [{'name': ingredient[1], 'id': ingredient[0], 'type': ingredient[2]} for ingredient in ingredients]
        return jsonify(arrayToSerialize)

@app.route('/api/ingredients/id/<id>', methods=['GET'])
def particularIngredientAPI(id):
    ingredient = ingredientDAO.getByID(id)
    print(ingredient)

# Application routes

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/<path:path>', methods=['GET'])
def any_root_path(path):
    return render_template('index.html')