# JP Colonna - SIRIUS WEB

Application de gestion de la société JP Colonna.
Ce projet est développé avec ANGULAR CLI en version 5.


# Installation



## Angular

Se mettre dans le dossier du projet Angular.



- Installer les dépendances du projet : 

```shell
npm install
```



## Cordova

Se mettre dans le dossier du projet Cordova.



- Installer les plateformes et dépendances du projet Cordova : 

```shell
cordova prepare
```



# Utilisation

Toutes les commandes suivantes peuvent se lancer dans un terminal (cmd.exe ou powershell.exe) au niveau du projet Angular.



## Angular



- Démarrer le projet et le lancer dans un navigateur : 

```shell
npm start
```



- Démarrer le projet uniquement : 

```shell
ng serve
```



- Ouvrir Chrome en mode debug (marche uniquement avec Visual Studio Code et Chrome) : 

```shell
ng serve #puis F5 dans Visual Studio Code
```



## Cordova 



- Compiler le projet Angular, copier les fichiers dans le project Cordova et lancer le projet Cordova dans un navigateur : 

```shell
npm run cordova-run-browser
```



- Compiler le projet Angular, copier les fichiers dans le project Cordova et lancer le projet Cordova sur un mobile Android :

```shell
npm run cordova-run-android
```



- Lancer uniquement le projet sur un mobile Android (pas de compilation ni de copie au préalable) : 

```shell
npm run cordova-serve
```

# Déploiement
## Compilation

## Installation sur serveur
Pour appliquer un thème par environnement (développement, recette et production), le fichier <b>theme.scss</b> présent sur le serveur contient les couleurs propres à l'environnement. 
<b>CE FICHIER NE DOIT JAMAIS ÊTRE ECRASSÉ.</b>