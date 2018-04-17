import configparser
import pymysql
import pymysql.cursors
import os

# Read MySQL config info from config/database.ini
dbConfig = configparser.ConfigParser()
dbConfig.read('database.ini')
mySQLConfig = dbConfig['MYSQL']
host, user, password, db = mySQLConfig['host'], mySQLConfig['user'], mySQLConfig['password'], mySQLConfig['db']

# Initialize connection to the MySQL DB
connection = pymysql.connect(host, user, password, db, charset="utf8", autocommit=True)
cursor = connection.cursor()

def executeScriptsFromFile(filename):
    # Open and read the file as a single buffer
    fd = open(filename, 'r')
    sqlFile = fd.read()
    fd.close()

    # all SQL commands (split on ';')
    sqlCommands = sqlFile.split(';')

    # Execute every command from the input file
    for command in sqlCommands:
        cursor.execute(command)

try:
    executeScriptsFromFile("init.sql")
    ingredienttypesRequest = "LOAD DATA INFILE %s INTO TABLE ingredienttypes COLUMNS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"';"
    ingredientRequest = "LOAD DATA INFILE %s INTO TABLE ingredients COLUMNS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"';"
    recipeIngredientsRequest = "LOAD DATA INFILE %s INTO TABLE recipeingredients COLUMNS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"';"
    recipeRequest = "LOAD DATA INFILE %s INTO TABLE recipes COLUMNS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"';"
    measurementunitsRequest = "LOAD DATA INFILE %s INTO TABLE measurementunits COLUMNS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"';"

    ingredienttypesFile = os.path.join(os.path.dirname(os.path.abspath(__file__)), "IngredientTypes.csv")
    ingredientFile = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Ingredients.csv")
    recipesFile = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Recipes.csv")
    measurementUnitsFile = os.path.join(os.path.dirname(os.path.abspath(__file__)), "MeasurementUnits.csv")
    recipeIngredientsFile = os.path.join(os.path.dirname(os.path.abspath(__file__)), "RecipeIngredients.csv")

    cursor.execute(ingredienttypesRequest, (ingredienttypesFile))
    cursor.execute(ingredientRequest, (ingredientFile))
    cursor.execute(recipeRequest, (recipesFile))
    cursor.execute(measurementunitsRequest, (measurementUnitsFile))
    cursor.execute(recipeIngredientsRequest, (recipeIngredientsFile))
except (pymysql.err.InternalError):
    pass