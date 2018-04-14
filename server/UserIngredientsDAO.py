class UserIngredientsDAO:
    def __init__(self, cursor):
        self.cursor = cursor

    def addToUser(self, email, ingredientIds):
        request = "INSERT INTO userIngredients VALUES(%s, %s)"
        for id in ingredientIds:
            self.cursor.execute(request, (email, id))

    def removeFromUser(self, email, ingredientId):
        request = "DELETE FROM userIngredients WHERE email = %s AND ingredient = %s"
        self.cursor.execute(request, (email, ingredientId))

    def getUserIngredients(self, email):
        request = "SELECT ingredient FROM userIngredients WHERE email = %s"
        self.cursor.execute(request, (email))
        return self.cursor.fetchall()