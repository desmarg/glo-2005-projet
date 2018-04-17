CREATE TABLE Users(email varchar(320), password varchar(320), firstName varchar(60), lastName varchar(60), PRIMARY KEY(email));
CREATE TABLE IngredientTypes(id integer unsigned, name varchar(60), PRIMARY KEY(id));
CREATE TABLE MeasurementUnits(id integer unsigned, name varchar(20), PRIMARY KEY(id));
CREATE TABLE Ingredients(id integer unsigned, name varchar(60), type integer unsigned, PRIMARY KEY(id), FOREIGN KEY(type) REFERENCES IngredientTypes(id));
CREATE TABLE Recipes(id integer unsigned, name varchar(320), rating tinyint(1) unsigned, content text, prepTime integer unsigned, totalTime integer unsigned, PRIMARY KEY(id));
CREATE TABLE comments(id integer unsigned, email varchar(320), recipe integer unsigned, content text, commenttime datetime, PRIMARY KEY(id), FOREIGN KEY(email) REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY(recipe) REFERENCES recipes(id) ON DELETE CASCADE);
CREATE TABLE Votes(recipe integer unsigned, email varchar(320), rating tinyint unsigned NOT NULL, PRIMARY KEY(recipe, email), FOREIGN KEY(recipe) REFERENCES recipes(id), FOREIGN KEY(email) REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE recipeIngredients(recipe integer unsigned, ingredient integer unsigned, quantity float, unit integer unsigned, FOREIGN KEY(recipe) REFERENCES recipes(ID) ON DELETE CASCADE, FOREIGN KEY(ingredient) REFERENCES ingredients(ID), FOREIGN KEY(unit) REFERENCES measurementunits(ID));
CREATE TABLE tokens(token varchar(320), email varchar(320) UNIQUE, createtime datetime, PRIMARY KEY(email), FOREIGN KEY(email) REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE userIngredients(email varchar(320), ingredient integer unsigned, PRIMARY KEY(email, ingredient), FOREIGN KEY(ingredient) REFERENCES ingredients(id) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE VIEW userProfiles as SELECT email, firstName, lastName from users;
CREATE TRIGGER updateRecipeAverageRating AFTER INSERT ON votes
FOR EACH ROW UPDATE recipes
	SET rating = (SELECT AVG(rating) FROM votes V WHERE V.recipe = new.recipe)
WHERE id = NEW.recipe;
CREATE TRIGGER updateRecipeAverageRatingAfterUpdate AFTER UPDATE ON votes
FOR EACH ROW UPDATE recipes
	SET rating = (SELECT AVG(rating) FROM votes V WHERE V.recipe = new.recipe)
WHERE id = NEW.recipe;
ALTER TABLE `recipes` DROP PRIMARY KEY, ADD PRIMARY KEY (`id`) USING BTREE;
ALTER TABLE `recipeingredients` DROP INDEX `recipe`, ADD INDEX `recipe` (`recipe`) USING BTREE;
ALTER TABLE `recipeingredients` DROP INDEX `ingredient`, ADD INDEX `ingredient` (`ingredient`) USING BTREE;
ALTER TABLE `comments` DROP INDEX `recipe`, ADD INDEX `recipe` (`recipe`) USING BTREE;