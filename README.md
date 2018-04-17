# Guide de cuisine (Projet de session de l'équipe 13 pour le cours GLO-2005, Hiver 2018)

# À l'attention du correcteur
1. Nous avons créé un API REST pour ce projet. Le frontend de l'application y fait souvent des requêtes. Il arrive parfois que certaines requêtes prennent du temps à s'exécuter **surtout lors de la recherche d'ingrédients et de l'envoi de commentaires**, mais elles fonctionnent toutes. Donc si vous remarquez parfois un certain délai entre une action et une réponse du frontend, il suffit d'attendre quelques secondes. En appuyant sur F12 et en allant dans la section network (ou réseau) dans votre navigateur, vous verrez alors une ou plusieurs requêtes pending. Elles se résolveront toutes seules après quelques secondes.
2. Certains éléments graphiques utilisent des librairies externes telles que bootstrap. Assurez-vous d'être connecté à internet pour avoir le design voulu.
3. Lisez la section [Scénario de test](#scénario-de-test) pour une explication du fonctionnement de l'application et une suggestion de scénario pour la tester.

# Table des matières
* [Installation du projet](#installation-du-projet)
* [Rouler le projet](#rouler-le-projet)
* [Installation développeur](#installation-développeur)

# Installation du projet

Avant de commencer, assurez-vous d'avoir la dernière version de [Python 3](https://www.python.org/downloads/) ainsi que [PIP](https://pypi.python.org/pypi/pip).

Ce projet est réalisé en React et utilise plusieurs paquets gérés avec NPM et webpack.

**Vous n'avez pas besoin d'installer quoi que ce soit pour rouler le projet. Tout le code javascript compilé se trouve dans le fichier bundle.js. Cependant, si vous souhaitez compiler le code source par vous-même, [Lisez la section installation développeur](#installation-développeur)**

## Clôner le projet:
```
git clone https://github.com/desmarg/glo-2005-projet.git
```

## Configuration de la base de données

1. Créez une base de données locale en lui donnant le nom que vous voulez. Faites attention à bien choisir un interclassement UTF-8.
Modifiez le fichier `server/config/database.ini` en remplaçant les 4 valeurs sous la section MYSQL par les informations de votre base de données locale.
Note: host est généralement localhost.

2. Roulez le script `setup.py` situé dans le dossier `server/config`

**Attention, le script importe 4 fichiers csv de données. Si des erreurs surviennent lors de cet import, vous pouvez faire l'import manuellement avec la méthode de votre choix en utilisant les 4 fichiers .csv dans `server/config`. Chaque fichier est nommé selon la table à laquelle il correspond.**

# Rouler le projet

Déplacez-vous dans le dossier server/:
```
cd glo-2005-projet/server/
```
Lancez l'application
```
python server.py
```

Rendez vous à l'adresse http://localhost:5000/ dans votre navigateur

# Installation développeur

**Cette installation vous permet de compiler le code source et le modifier. Si vous souhaitez uniquement rouler le projet tel quel, lisez la section [Installation du projet](#installation-du-projet)**

## Installer NPM:
https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm

## Installer webpack
```
npm install --save-dev webpack
```

## Clôner le projet:
```
git clone https://github.com/desmarg/glo-2005-projet.git
```
## Installer les dépendences:

Déplacez-vous dans le dossier static/:
```
cd glo-2005-projet/static/
```
Installez les dépendences grâce à NPM:
```
npm install
```
## Construire le frontend

```
npm run build
```

# Scénario de test

Cette application vous permet d'ajouter les ingrédients que vous possédez, et obtenir une liste de recettes contenant un ou plusieurs de ces ingrédients. Afin d'ajouter une complexité, nous avons créé un système d'authentification.

Scénario de test:

1. Rendez-vous au [localhost:5000](localhost:5000)
2. Cliquez sur créer un compte
3. Suivez les instructions
4. Une fois connecté, allez à la section ingrédients
5. Cherchez et ajoutez plusieurs ingrédients (vous pouvez également en enlever)
6. Allez à la section recettes, et vous verrez les recettes qui vous sont suggérées
7. Cliquez sur une recette pour la voir en détail
8. Vous pouvez laisser un commentaire et voter. La note sur 5 de la recette (sous le titre) sera mise à jour lorsque vous rafraichissez la page.
9. Visitez votre profil pour voir les recettes sur lesquelles vous avez commenté et (ou) voté.
10. Déconnectez-vous

