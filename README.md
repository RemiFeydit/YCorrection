# YCorrection

## Description

Le projet est une correction automatique d'examen, le programme convertit le dossier CSV avec la liste des étudiants fourni par l'HyperPlanning en JSON, créer automatiquement les liens des repositories où sont censés se situer les examens en spécifiant le nom qu'est censé avoir un repository.
Le programme clone automatiquement tous les repositories en les nommant en fonction des noms et prénoms des étudiants. Le programme fait par la suite la correction automatique des programmes et créé un fichier en `.json` avec les résultats par exercices.

## Pré-requis

- Avoir node et yarn

## Installation

- Cloner le repository
- `yarn install`
- Créer un dossier `data` où vous mettez les fichiers `.csv` générés par l'HyperPlanning
- Copiez le `.env.example` et faites un `.env` puis remplissez la variable avec le token de l'API de GITEA
  Pour la récupérer, faites la commande suivante :


Si vous êtes sous linux :
```bash
curl -H "Content-Type: application/json" -d '{"name":"test"}' -u <ytrackUsername>:<ytrackPassword> https://ytrack.learn.ynov.com/git/api/v1/users/<ytrackUsername>/tokens
```

Si vous êtes sur Windows allez sur ce site pour pouvoir lancer la commande : https://reqbin.com/curl

## Exemples

```bash
node main.js
```
