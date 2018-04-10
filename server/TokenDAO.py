class TokenDAO:
    def __init__(self, cursor):
        self.cursor = cursor
    
    def create(self, token):
        request = "INSERT INTO tokens VALUES(%s, CURRENT_TIMESTAMP())"
        self.cursor.execute(request, (token))

    def delete(self, token):
        request = "DELETE FROM tokens WHERE token = %s"
        self.cursor.execute(request, (token))

    def isTokenValid(self, token):
        request = "SELECT COUNT(*) FROM tokens WHERE token = %s"
        self.cursor.execute(request, (token))
        if self.cursor.fetchone()[0] != 1:
            return False
        else:
            return True