class FavoriteDAO:
    def __init__(self, cursor):
        self.cursor = cursor
    
    def create(self, email, recipe):
        request = "SELECT COUNT(*) FROM Favorites WHERE email = %s AND recipe = %s"
        self.cursor.execute(request, (email, recipe))
        favoriteCount = self.cursor.fetchone()[0]
        if favoriteCount > 0:
            return
        request = "INSERT INTO Favorites(email, recipe) values (%s, %s)"
        self.cursor.execute(request, (email, recipe))

    def remove(self, email, recipe):
        request = "DELETE FROM Favorites WHERE email = %s AND recipe = %s"
        self.cursor.execute(request, (email, recipe))

    def getFromUser(self, email):
        request = "SELECT recipe FROM Favorites WHERE email = %s"
        self.cursor.execute(request, (email))
        return self.cursor.fetchall()