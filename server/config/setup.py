import configparser
import pymysql
import pymysql.cursors

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
        print(command)
        cursor.execute(command)

executeScriptsFromFile("init.sql")