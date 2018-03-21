import configparser
import pymysql
import pymysql.cursors
from RecipeDAO import RecipeDAO
from UserDAO import UserDAO
from IngredientDAO import IngredientDAO

# Read MySQL config info from config/database.ini
dbConfig = configparser.ConfigParser()
dbConfig.read('config/database.ini')
mySQLConfig = dbConfig['MYSQL']
host, user, password, db = mySQLConfig['host'], mySQLConfig['user'], mySQLConfig['password'], mySQLConfig['db']

# Initialize connection to the MySQL DB
connection = pymysql.connect(host, user, password, db, charset="utf8")
cursor = connection.cursor()

recipeDAO = RecipeDAO(cursor)
userDAO = UserDAO(cursor)
ingredientDAO = IngredientDAO(cursor)