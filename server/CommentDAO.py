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
        request = "INSERT INTO Comments(id, email, recipe, content, commenttime) values (%s, %s, %s, %s, %s)"
        dateComment = datetime.now()
        self.cursor.execute(request, (newId, email, recipe ,content, dateComment))

    def edit(self, newContent, commentId):
        request = "UPDATE Comments SET content = %s WHERE id = %s"
        self.cursor.execute(request, (newContent, commentId))

    def remove(self, commentId):
        request = "DELETE FROM Comments WHERE id = %s"
        self.cursor.execute(request, (commentId))

    def getFromUser(self, email):
        request = "SELECT email, recipe, content, commenttime FROM Comments WHERE email = %s"
        self.cursor.execute(request, (email))
        return self.cursor.fetchall()