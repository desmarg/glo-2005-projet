import configparser
import pymysql
import pymysql.cursors

# Read MySQL config info from config/database.ini
dbConfig = configparser.ConfigParser()
dbConfig.read('config/database.ini')
mySQLConfig = dbConfig['MYSQL']
host, user, password, db = mySQLConfig['host'], mySQLConfig['user'], mySQLConfig['password'], mySQLConfig['db']

# Initialize connection to the MySQL DB
connection = pymysql.connect(host, user, password, db, charset="utf8")
cursor = connection.cursor()

class RecipeDAO:
    def __init__(self):
        self.cursor = cursor
    
    def searchByIngredients(self, ingredientArray):
        pass

class UserDAO:
    def __init__(self):
        self.cursor = cursor

    def createUser(self):
        pass    
