import configparser
import pymysql
import pymysql.cursors
from RecipeDAO import RecipeDAO
from UserDAO import UserDAO
from IngredientDAO import IngredientDAO
from CommentDAO import CommentDAO
from VoteDAO import VoteDAO
from TokenDAO import TokenDAO

# Read MySQL config info from config/database.ini
dbConfig = configparser.ConfigParser()
dbConfig.read('config/database.ini')
mySQLConfig = dbConfig['MYSQL']
host, user, password, db = mySQLConfig['host'], mySQLConfig['user'], mySQLConfig['password'], mySQLConfig['db']

# Initialize connection to the MySQL DB
connection = pymysql.connect(host, user, password, db, charset="utf8", autocommit=True)
cursor = connection.cursor()

recipeDAO = RecipeDAO(cursor)
userDAO = UserDAO(cursor)
ingredientDAO = IngredientDAO(cursor)
commentDAO = CommentDAO(cursor)
voteDAO = VoteDAO(cursor)
tokenDAO = TokenDAO(cursor)