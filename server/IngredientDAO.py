from sqlUtils import makeTupleStringFromArray

class IngredientDAO:
    def __init__(self, cursor):
        self.cursor = cursor

    # returns 1 on success, 0 on failure
    def create(self, name, typeID):
        self.cursor.execute("SELECT MAX(id) FROM ingredients")
        lastIngredientID = self.cursor.fetchall()[0][0]
        newIngredientID = 1 if lastIngredientID is None else lastIngredientID + 1
        request = "INSERT INTO ingredients VALUES (" + str(newIngredientID) +", %s, %s)"
        return self.cursor.execute(request, (name, typeID))
    
    def getAll(self):
        request = "SELECT * FROM ingredients"
        self.cursor.execute(request)
        return self.cursor.fetchall()

    def getByID(self, id):
        request = "SELECT * FROM ingredients WHERE id = %s"
        self.cursor.execute(request, (id))
        return self.cursor.fetchall()

    def searchByName(self, searchQuery): 
        request = "SELECT * FROM ingredients WHERE name LIKE %s"
        self.cursor.execute(request, ("%"+searchQuery+"%",))
        return self.cursor.fetchall()

    def searchByType(self, typeID):
        request = "SELECT * FROM ingredients WHERE type = %s"
        self.cursor.execute(request, (typeID))
        return self.cursor.fetchall()

    def getTypes(self):
        request = "SELECT * FROM ingredienttypes"
        self.cursor.execute(request)
        return self.cursor.fetchall()

    def getFromRecipe(self, recipeID):
        request = "SELECT * FROM recipeingredients WHERE recipe = %s"
        self.cursor.execute(request)
        return self.cursor.fetchall()

    def getSeveral(self, ids):
        request = "SELECT * FROM ingredients WHERE id IN" + makeTupleStringFromArray(ids)
        self.cursor.execute(request, tuple(ids))
        return self.cursor.fetchall()