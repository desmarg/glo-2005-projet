from datetime import datetime

class CommentDAO:
    def __init__(self, cursor):
        self.cursor = cursor
    
    def create(self, email, recipe, content):
        request = "SELECT MAX(id) FROM Comments"
        self.cursor.execute(request)
        id = self.cursor.fetchone()[0]
        if id:
            newId = id + 1
        else:
            newId = 1
        request = "INSERT INTO Comments(id, email, recipe, content, commenttime) values (%s, %s, %s, %s, CURRENT_TIMESTAMP())"
        self.cursor.execute(request, (newId, email, recipe, content))

    def remove(self, commentId):
        request = "DELETE FROM Comments WHERE id = %s"
        self.cursor.execute(request, (commentId))

    def getFromUser(self, email):
        request = "SELECT recipe, content FROM Comments WHERE email = %s"
        self.cursor.execute(request, (email))
        return self.cursor.fetchall()

    def getFromRecipe(self, recipe):
        request = "SELECT email, content, commenttime FROM comments WHERE recipe = %s"
        self.cursor.execute(request, (recipe))
        return self.cursor.fetchall()