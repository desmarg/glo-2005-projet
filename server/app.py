from flask import Flask, render_template
import database_interface

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/<path:path>', methods=['GET'])
def any_root_path(path):
    return render_template('index.html')