from flask import Flask, render_template, request, jsonify, abort, make_response, url_for, current_app
from database_interface import userDAO, commentDAO, recipeDAO, tokenDAO, voteDAO, ingredientDAO, userIngredientsDAO
from datetime import timedelta
from functools import update_wrapper
import os
import auth
import json
import pymysql

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")



def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, list):
        headers = ', '.join(x.upper() for x in headers)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = "http://127.0.0.1:5000"
            h['Access-Control-Allow-Credentials'] = 'true'
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator

#API routes

# throw 404 if api route is unmatched
@app.route('/api/<path:path>')
def unmatchedAPIRoute(path):
    abort(404)

@app.route('/api/ingredients/', methods=['GET', 'POST', 'OPTIONS'])
@crossdomain(origin='*')
def ingredientsAPI():
    if request.method == 'GET':
        searchQuery = request.args.get('search')
        if searchQuery is None:
            matchingIngredients = ingredientDAO.getAll()
        else:
            matchingIngredients = ingredientDAO.searchByName(searchQuery)
        arrayToSerialize = [{'name': ingredient[1], 'id': ingredient[0], 'type': ingredient[2]} for ingredient in matchingIngredients]
        response = jsonify({"code": 200, "data": arrayToSerialize})
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5000')
        return response

@app.route('/api/ingredients/id/<id>', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def particularIngredientAPI(id):
    ingredient = ingredientDAO.getByID(id)
    if not ingredient:
        return make_response('', 204)
    response = jsonify({"code": 200, "data": {'name': ingredient[0][1], 'id': ingredient[0][0], 'type': ingredient[0][2]}})
    response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
    return response

@app.route('/api/recipes/id/<id>', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def recipes(id):
    recipe = recipeDAO.getByID(id)
    if not recipe:
        response = jsonify({"code": 204, "message": "Recipe doesn't exist"})
        response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
        response.status_code = 204
        return response

    recipe = recipe[0]
    comments = commentDAO.getFromRecipe(recipe[0])
    commentArray = [{"email": comment[0], "content": comment[1]} for comment in comments]
    response = jsonify({"code": 200, "data": {'id': recipe[0], 'name': recipe[1], 'rating': recipe[2], 'description': recipe[3], 'prepTime': recipe[4], 'totalTime': recipe[5], "comments": commentArray}})
    response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
    return response

@app.route('/api/auth/register', methods=['POST', 'OPTIONS'])
@crossdomain()
def register():
    loginData = request.get_json(force=True)
    if not (loginData["email"] and loginData["firstName"] and loginData["lastName"] and loginData["password"]):
        response = jsonify({"code": 400, "message": 'Invalid or missing parameters'})
        response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
        response.status_code = 400
        return response

    (email, firstName, lastName, password) = (loginData["email"], loginData["firstName"], loginData["lastName"], loginData["password"])

    if userDAO.create(email, password, firstName, lastName) == -1:
        response = jsonify({"code": 409,"message": 'User already exists'})
        response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
        response.status_code = 409
        return response
    
    newToken = auth.create_token()
    tokenDAO.create(newToken, email)

    response = jsonify({"code": 200, "userToken": newToken})
    response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
    return response

@app.route('/api/auth/login', methods=['POST', 'OPTIONS'])
@crossdomain()
def login():
    loginData = request.get_json(force=True)
    if not (loginData["email"] and loginData["password"]):
        response =  jsonify({"code": 400, "message": 'Invalid or missing parameters'})
        response.status_code = 400
        response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
        return response

    (email, password) = (loginData["email"], loginData["password"])
    if not userDAO.verifyPassword(email, password):
        response = jsonify({"code": 401, "message": "Invalid credentials"})
        response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
        response.status_code = 401
        return response
    
    newToken = auth.create_token()
    tokenDAO.update(newToken, email)

    response = jsonify({"code": 200, "userToken": newToken})
    response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
    return response

@app.route('/api/auth/logout', methods=['POST', 'OPTIONS'])
@crossdomain(origin='*')
def logout():
    data = request.get_json(force=True)
    if not data["userToken"]:
        response = jsonify({"code": 400, "message": 'Invalid or missing parameters'})
        response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
        response.status_code = 400
        return response
    
    tokenDAO.delete(data["userToken"])

    response = jsonify({"code": 200, "message": "User successfully logged out"})
    response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
    return response

@app.route('/api/auth/verifytoken', methods=['POST', 'OPTIONS'])
@crossdomain(origin='*')
def verifyToken():
    data = request.get_json(force=True)
    if not data["userToken"]:
        response = jsonify({"code": 400, "message": 'Invalid or missing request parameters'})
        response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
        response.status_code = 400
        return response

    if not tokenDAO.isTokenValid(data["userToken"]):
        response = jsonify({"code": 403, "tokenIsValid": False})
        response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
        response.status_code = 403
        return response
    
    response = jsonify({"code": 200, "tokenIsValid": True})
    response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
    return response

@app.route('/api/user/<token>', methods=['GET', 'POST', 'OPTIONS'])
@crossdomain(origin='*')
def user(token):
    if request.method == 'GET':
        userEmail = tokenDAO.getEmail(token)
        if not userEmail:
            response = jsonify({"code": 404, "message": "Can't find user"})
            response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
            response.status_code = 404
            return response
       
        userInfo = userDAO.getByEmail(userEmail)

        userVotes = voteDAO.getFromUser(userEmail)
        userVoteArray = [
            {
                "recipe": {
                    "id": vote[0],
                    "name": recipeDAO.getByID(vote[0])[0][1]
                },
                "rating": vote[1]
            }
            for vote in userVotes
        ]
        
        userComments = commentDAO.getFromUser(userEmail)
        userCommentArray = [
            {
                "recipe": {
                    "id": comment[0],
                    "name": recipeDAO.getByID(comment[0])[0][1]
                },
                "content": comment[1]
            }
            for comment in userComments
        ]
        response = jsonify({"code": 200, "data": {"email": userInfo[0][0], "firstName": userInfo[0][1], "lastName": userInfo[0][2], "votes": userVoteArray, "comments": userCommentArray}})
        response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
        return response

@app.route('/api/user/<token>/ingredients', methods=['GET', 'POST', 'DELETE', 'OPTIONS'])
@crossdomain(origin='*')
def userIngredients(token):
    userEmail = tokenDAO.getEmail(token)
    if not userEmail:
        response = jsonify({"code": 404, "message": "Can't find user"})
        response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
        response.status_code = 404
        return response

    if request.method == 'POST':
        data = request.get_json(force=True)
        if not data["ingredientIds"]:
            response = jsonify({"code": 400, "message": 'Invalid or missing request parameters'})
            response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
            response.status_code = 400
            return response
        ingredientIds = [int(id) for id in data["ingredientIds"]]
        try:
            userIngredientsDAO.addToUser(userEmail, ingredientIds)
        except pymysql.err.IntegrityError:
            pass
    if request.method == 'DELETE':
        data = request.get_json(force=True)
        if not data["ingredientIds"]:
            response = jsonify({"code": 400, "message": 'Invalid or missing request parameters'})
            response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
            response.status_code = 400
            return response
        ingredientIds = [int(id) for id in data["ingredientIds"]]
        try:
            userIngredientsDAO.removeFromUser(userEmail, ingredientIds)
        except pymysql.err.IntegrityError:
            pass
    
    userIngredientIds = userIngredientsDAO.getUserIngredients(userEmail)
    if len(userIngredientIds) == 0:
        arrayToSerialize = []
    else:
        matchingIngredients = ingredientDAO.getSeveral(userIngredientIds)
        arrayToSerialize = [{'name': ingredient[1], 'id': ingredient[0], 'type': ingredient[2]} for ingredient in matchingIngredients]
    response = jsonify({"code": 200, "data": arrayToSerialize})
    response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
    return response
        
@app.route('/api/user/<token>/recipes', methods=['GET', 'OPTIONS'])
@crossdomain(origin='*')
def userRecipes(token):
    userEmail = tokenDAO.getEmail(token)
    if not userEmail:
        response = jsonify({"code": 404, "message": "Can't find user"})
        response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
        response.status_code = 404
        return response
        
    
    userIngredientIds = userIngredientsDAO.getUserIngredients(userEmail)
    if not userIngredientIds:
        arrayToSerialize = []
    else:
        userRecipes = recipeDAO.searchByIngredients(userIngredientIds)
        arrayToSerialize = [{'id': recipe[0], 'name': recipe[1], 'rating': recipe[2], 'description': recipe[3], 'prepTime': recipe[4], 'totalTime': recipe[5]} for recipe in userRecipes]
    response = jsonify({"code": 200, "data": arrayToSerialize})
    response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
    return response

@app.route('/api/user/<token>/votes/id/<id>', methods=['GET', 'POST', 'OPTIONS'])
@crossdomain(origin='*')
def voteForRecipe(token, id):
    userEmail = tokenDAO.getEmail(token)
    if not userEmail:
        response = jsonify({"code": 404, "message": "Can't find user"})
        response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
        response.status_code = 404
        return response
    
    if request.method == 'GET':
        userVote = voteDAO.getUserVoteForRecipe(userEmail, id)
        if not userVote:
            returnRating = 0
        else:
            returnRating = userVote[0]
    elif request.method == 'POST':
        data = request.get_json(force=True)
        if not data["userVote"]:
            response = jsonify({"code": 400, "message": 'Invalid or missing request parameters'})
            response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
            response.status_code = 400
            return response
        voteDAO.update(id, userEmail, data["userVote"])
        returnRating = data["userVote"]

    response = jsonify({"code": 200, "data": {"rating": returnRating}})
    response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
    return response

@app.route('/api/user/<token>/comments/id/<id>', methods=['GET', 'POST', 'OPTIONS'])
@crossdomain(origin='*')
def commentForRecipe(token, id):
    userEmail = tokenDAO.getEmail(token)
    if not userEmail:
        response = jsonify({"code": 404, "message": "Can't find user"})
        response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
        response.status_code = 404
        return response
    
    recipe = recipeDAO.getByID(id)
    if not recipe:
        response = jsonify({"code": 204, "message": "Recipe doesn't exist"})
        response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
        response.status_code = 204
        return response
    recipe = recipe[0]
    
    if request.method == 'POST':
        data = request.get_json(force=True)
        if not data["userComment"]:
            response = jsonify({"code": 400, "message": 'Invalid or missing request parameters'})
            response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
            response.status_code = 400
            return response
        commentDAO.create(userEmail, id, data["userComment"])

    comments = commentDAO.getFromRecipe(recipe[0])
    commentArray = [{"email": comment[0], "content": comment[1]} for comment in comments]
    response = jsonify({"code": 200, "data": {'id': recipe[0], 'name': recipe[1], 'rating': recipe[2], 'description': recipe[3], 'prepTime': recipe[4], 'totalTime': recipe[5], "comments": commentArray}})
    response.headers.add('Access-Control-Allow-Origin', 'localhost:5000')
    return response

# Application routes

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def any_root_path(path):
    return render_template('index.html')
