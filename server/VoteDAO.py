class VoteDAO:
    def __init__(self, cursor):
        self.cursor = cursor
    
    def create(self, email, recipe, newVote):
        request = "SELECT rating FROM Votes"
        self.cursor.execute(request)
        rating = self.cursor.fetchone()[0]
        if rating:
            return
        else:
            request = "INSERT INTO Votes(recipe, email, rating) values (%s, %s, %s)"
            self.cursor.execute(request, (recipe, email, newVote))

    def edit(self, recipe, email, editVote):
        request = "SELECT rating FROM Votes"
        self.cursor.execute(request)
        rating = self.cursor.fetchone()[0]
        if rating:
            request = "UPDATE Votes SET rating = %s WHERE recipe = %s AND email = %s"
            self.cursor.execute(request, (editVote, recipe, email))
        else:
            return

    def remove(self, recipe, email):
        request = "DELETE FROM Votes WHERE recipe = %s AND email = %s"
        self.cursor.execute(request, (recipe, email))

    def getFromUser(self, recipe, email):
        request = "SELECT rating FROM Votes WHERE recipe = %s AND email = %s"
        self.cursor.execute(request, (recipe, email))
        return self.cursor.fetchall()