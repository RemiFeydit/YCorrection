# YCorrection

## Description

Le projet est une correction automatique d'examen, le programme convertit le dossier CSV avec la liste des étudiants
fourni par l'HyperPlanning en JSON, créer automatiquement les liens des repositories où sont censés se situer les
examens en spécifiant le nom qu'est censé avoir un repository.
Le programme clone automatiquement tous les repositories en les nommant en fonction des noms et prénoms des étudiants.
Le programme fait par la suite la correction automatique des programmes et créé un fichier en `.json` avec les résultats
par exercices.

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

Si vous êtes sur Windows allez dans vos paramètres gitea et dans Applications, vous pourrez ensuite générer un token que
vous mettrez ensuite dans votre `.env`

## Exemples

```bash
node main.js
```

## Utilisation

Il y a 3 features principales sur ce programme :

- Clonage de repositories
- Correction
- Vérification de progression d'un parcours YTrack

Pour chacune de ces fonctions un fichier CSV venant de l'Hyperplanning est nécessaire pour que le programme fonctionne
et doit être converti en JSON.
