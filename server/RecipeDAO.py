from sqlUtils import *

class RecipeDAO:
    def __init__(self, cursor):
        self.cursor = cursor
    
    def create(self, name, typeID):
        self.cursor.execute("SELECT MAX(id) FROM recipes")
        lastRecipeID = self.cursor.fetchall()[0][0]
        newRecipeID = 1 if lastRecipeID is None else lastRecipeID + 1
        request = "INSERT INTO recipes VALUES (" + str(newRecipeID) +", %s, %s)"
        return self.cursor.execute(request, (name, typeID))

    def getAll(self):
        request = "SELECT * FROM recipes"
        self.cursor.execute(request)
        return self.cursor.getchall()

    def getFromCreator(self, creatorID):
        request = "SELECT creator FROM recipes WHERE creator = %s"
        self.cursor.execute(request)
        return self.cursor.fetchall()

    def searchByIngredients(self, ingredientArray):
        request = "SELECT R.* FROM recipes R, recipeingredients RI WHERE RI.ingredient IN "+ makeTupleStringFromArray(ingredientArray)+" AND R.id = RI.recipe"
        self.cursor.execute(request, tuple(ingredientArray))
        return self.cursor.fetchall()

    def searchByName(self):
        request = "SELECT * FROM recipes WHERE name = %s"
        self.cursor.execute(request)
        return self.cursor.fetchall()

    def searchByNote(self):
        request = "SELECT * FROM recipes where note = %s"
        self.cursor.execute(request)
        return self.cursor.fetchall()