from sqlUtils import *

class RecipeDAO:
    def __init__(self, cursor):
        self.cursor = cursor
    
    def searchByIngredients(self, ingredientArray):
        request = "SELECT R.* FROM recipes R, recipeingredients RI WHERE RI.ingredient IN "+ makeTupleStringFromArray(ingredientArray)+" AND R.id = RI.recipe"
        self.cursor.execute(request, tuple(ingredientArray))
        return self.cursor.fetchall()