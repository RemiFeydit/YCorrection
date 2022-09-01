# YCorrection

## Description

Le projet est une correction automatique d'examen, le programme convertit le dossier CSV avec la liste des étudiants fourni par l'HyperPlanning en JSON, créer automatiquement les liens des repositories où sont censés se situer les examens en spécifiant le nom qu'est censé avoir un repository.
Le programme clone automatiquement tous les repositorys en les nommant en fonction des noms et prénoms des étudiants. Le programme fait par la suite la correction automatique des programmes et créé un fichier en `.json` avec les résultats par exercices.

## Pré-requis

-   Avoir node et npm

## Installation

-   Cloner le repository
-   `npm install`
-   Créer un dossier `data` où vous mettez les fichiers `.csv` généré par l'HyperPlanning

## Exemples

```bash
node main.js <nomFichier> <nomRepo>
```
