class UserDAO:
    def __init__(self, cursor):
        self.cursor = cursor

    def create(self, email, password, firstName, lastName):
        checkUserExistRequest = "SELECT COUNT(*) FROM users WHERE email = %s"
        self.cursor.execute(checkUserExistRequest, (email))
        if self.cursor.fetchone()[0] >= 1:
            return -1
        registerRequest = "INSERT INTO users VALUES(%s, SHA1(%s), %s, %s)"
        self.cursor.execute(registerRequest, (email, password, firstName, lastName))
        return 0

    def verifyPassword(self, email, passwordToVerify):
        request = "SELECT COUNT(*) FROM users WHERE email = %s AND password = SHA1(%s)"
        self.cursor.execute(request, (email, passwordToVerify))
        if self.cursor.fetchone()[0] == 1:
            return True
        else:
            return False