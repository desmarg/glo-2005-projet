class VoteDAO:
    def __init__(self, cursor):
        self.cursor = cursor
    
    def create(self, email, recipe, newVote):
        request = "SELECT COUNT(*) FROM Votes WHERE email = %s AND recipe = %s"
        self.cursor.execute(request, (email, recipe))
        ratingCount = self.cursor.fetchone()[0]
        if ratingCount > 0:
            return
        request = "INSERT INTO Votes(recipe, email, rating) values (%s, %s, %s)"
        self.cursor.execute(request, (recipe, email, newVote))

    def update(self, recipe, email, editVote):
        request = "SELECT COUNT(*) FROM Votes WHERE email = %s AND recipe = %s"
        self.cursor.execute(request, (email, recipe))
        ratingCount = self.cursor.fetchone()[0]
        if ratingCount > 0:
            request = "UPDATE Votes SET rating = %s WHERE recipe = %s AND email = %s"
            self.cursor.execute(request, (editVote, recipe, email))

    def remove(self, recipe, email):
        request = "SELECT COUNT(*) FROM Votes WHERE email = %s AND recipe = %s"
        self.cursor.execute(request, (email, recipe))
        ratingCount = self.cursor.fetchone()[0]
        if ratingCount > 0:
            request = "DELETE FROM Votes WHERE recipe = %s AND email = %s"
            self.cursor.execute(request, (recipe, email))

    def getFromUser(self, email):
        request = "SELECT recipe, rating FROM Votes WHERE email = %s"
        self.cursor.execute(request, (email))
        return self.cursor.fetchall()