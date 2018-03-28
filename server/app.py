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

@app.route('/api/profile/<email>', methods=['GET', 'POST'])
def commentsAPI(email):
    if request.method == 'GET':
        commentRecipe = commentDAO.getFromUser(email)
        if commentRecipe:
            commentArray = [{'email': comment[0], 'recipe': comment[1], 'content' : comment[2], 'commenttime' : comment[3]} for comment in commentRecipe]
        else:
            commentArray = []
        voteRecipe = voteDAO.getFromUser(email)
        if voteRecipe:
            voteArray = [{'recipe': vote[0], 'rating' : vote[1]} for vote in voteRecipe]
        else:
            voteArray = []
        favoriteRecipe = favoriteDAO.getFromUser(email)
        if favoriteRecipe:
            favoriteArray = [{'recipe': favorite[0]} for favorite in favoriteRecipe]
        else:
            favoriteArray = []
        profileDict = {
            "comments": commentArray,
            "votes": voteArray,
            "favorites": favoriteArray
        }
        return jsonify(profileDict)

@app.route('/api/ingredients/id/<id>', methods=['GET'])
def particularIngredientAPI(id):
    ingredient = ingredientDAO.getByID(id)
    if ingredient:
        return jsonify({'name': ingredient[0][1], 'id': ingredient[0][0], 'type': ingredient[0][2]})
    else:
        return make_response('', 204)

# Application routes

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def any_root_path(path):
    return render_template('index.html')
