class TokenDAO:
    def __init__(self, cursor):
        self.cursor = cursor
    
    def create(self, token, email):
        request = "INSERT INTO tokens VALUES(SHA1(%s), %s, CURRENT_TIMESTAMP())"
        self.cursor.execute(request, (token, email))

    def update(self, token, email):
        request = "INSERT INTO tokens (token, email, createtime) VALUES (SHA1(%s), %s, CURRENT_TIMESTAMP()) ON DUPLICATE KEY UPDATE token=VALUES(token), createtime=VALUES(createtime)"
        self.cursor.execute(request, (token, email))

    def delete(self, token):
        request = "UPDATE tokens SET token = NULL   WHERE token = SHA1(%s)"
        self.cursor.execute(request, (token))

    def isTokenValid(self, token):
        request = "SELECT COUNT(*) FROM tokens WHERE token = SHA1(%s)"
        self.cursor.execute(request, (token))
        if self.cursor.fetchone()[0] != 1:
            return False
        else:
            return True

    def getEmail(self, token):
        request = "SELECT email FROM tokens WHERE token = SHA1(%s)"
        self.cursor.execute(request, (token))
        return self.cursor.fetchall()