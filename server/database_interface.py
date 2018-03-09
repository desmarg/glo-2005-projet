import configparser
import pymysql
import pymysql.cursors

# Read MySQL config info from config/database.ini
dbConfig = configparser.ConfigParser()
dbConfig.read('config/database.ini')
MySQLConfig = dbConfig['MYSQL']
host, user, password, db = MySQLConfig['host'], MySQLConfig['user'], MySQLConfig['password'], MySQLConfig['db']

# Initialize connection to the MySQL DB
connection = pymysql.connect(host, user, password, db)
cursor = connection.cursor()

