class IngredientDAO:
    def __init__(self, cursor):
        self.cursor = cursor
    
    def getAll(self):
        request = "SELECT * FROM ingredients"
        self.cursor.execute(request)
        return self.cursor.fetchall()