# Guide de cuisine (Projet de session de l'équipe 13 pour le cours GLO-2005, Hiver 2018)

# Table des matières
* [Installation du projet](#installation-du-projet)
* [Rouler le projet](#rouler-le-projet)

# Installation du projet

Avant de commencer, assurez-vous d'avoir la dernière version de [Python 2](https://www.python.org/downloads/) ainsi que [PIP](https://pypi.python.org/pypi/pip)

## Installer Flask:
```
pip install flask
```

## Installer NPM:
https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm

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

## Spécifier la base de données à utiliser

Modifiez le fichier `server/config/database.ini` en remplaçant les 4 valeurs sous la section MYSQL par les informations de votre base de données locale.

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
