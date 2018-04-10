from flask import Flask, render_template, request, jsonify, abort, make_response, url_for
from database_interface import *
import os

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

#API routes

# throw 404 if api route is unmatched
@app.route('/api/<path:path>')
def unmatchedAPIRoute(path):
    abort(404)

@app.route('/api/ingredients/', methods=['GET', 'POST'])
def ingredientsAPI():
    if request.method == 'GET':
        searchQuery = request.args.get('search')
        if searchQuery is None:
            matchingIngredients = ingredientDAO.getAll()
        else:
            matchingIngredients = ingredientDAO.searchByName(searchQuery)
        arrayToSerialize = [{'name': ingredient[1], 'id': ingredient[0], 'type': ingredient[2]} for ingredient in matchingIngredients]
        return jsonify(arrayToSerialize)

@app.route('/api/ingredients/id/<id>', methods=['GET'])
def particularIngredientAPI(id):
    ingredient = ingredientDAO.getByID(id)
    if not ingredient:
        return make_response('', 204)
    return jsonify({'name': ingredient[0][1], 'id': ingredient[0][0], 'type': ingredient[0][2]})

# Application routes

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def any_root_path(path):
    return render_template('index.html')
