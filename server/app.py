from flask import Flask, render_template, request, jsonify, abort, make_response, url_for
from database_interface import userDAO, commentDAO, recipeDAO, tokenDAO, voteDAO, ingredientDAO
import os
import auth

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
        return jsonify({"code": 200, "data": arrayToSerialize}), 200

@app.route('/api/ingredients/id/<id>', methods=['GET'])
def particularIngredientAPI(id):
    ingredient = ingredientDAO.getByID(id)
    if not ingredient:
        return make_response('', 204)
    return jsonify({"code": 200, "data": {'name': ingredient[0][1], 'id': ingredient[0][0], 'type': ingredient[0][2]}}), 200

@app.route('/api/auth/register', methods=['POST'])
def register():
    loginData = request.json
    if not (loginData["email"] and loginData["firstName"] and loginData["lastName"] and loginData["password"]):
        return jsonify({"code": 400, "message": 'Invalid or missing parameters'}), 400

    (email, firstName, lastName, password) = (loginData["email"], loginData["firstName"], loginData["lastName"], loginData["password"])

    if userDAO.create(email, password, firstName, lastName) == -1:
        return jsonify({"code": 409,"message": 'User already exists'}), 409
    
    newToken = auth.create_token()
    tokenDAO.create(newToken, email)

    return jsonify({"code": 200, "userToken": newToken}), 200

@app.route('/api/auth/login', methods=['POST'])
def login():
    loginData = request.json
    if not (loginData["email"] and loginData["password"]):
        return jsonify({"code": 400, "message": 'Invalid or missing parameters'}), 400

    (email, password) = (loginData["email"], loginData["password"])
    if not userDAO.verifyPassword(email, password):
        return jsonify({"code": 401, "message": "Invalid credentials"}), 401
    
    newToken = auth.create_token()
    tokenDAO.update(newToken, email)

    return jsonify({"code": 200, "userToken": newToken}), 200

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    data = request.json
    if not data["userToken"]:
        return jsonify({"code": 400, "message": 'Invalid or missing parameters'}), 400
    
    tokenDAO.delete(data["userToken"])

    return jsonify({"code": 200, "message": "User successfully logged out"}), 200

@app.route('/api/auth/verifytoken', methods=['POST'])
def verifyToken():
    data = request.json
    print(data)
    if not data["userToken"]:
        return jsonify({"code": 400, "message": 'Invalid or missing request parameters'}), 400

    if not tokenDAO.isTokenValid(data["userToken"]):
        return jsonify({"code": 403, "tokenIsValid": False}), 403
    
    return jsonify({"code": 200, "tokenIsValid": True}), 200

# Application routes

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def any_root_path(path):
    return render_template('index.html')
