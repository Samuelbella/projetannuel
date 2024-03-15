# Projet annuel
Ce projet a pour but de développer une application web permettant aux utilisateurs de dessiner des chiffres qui seront comparés à un modèles avec le Machine Learning pour permettre de reconnaître le chiffre dessiné.  
Nous avons entraîner 3 modèle : Arbre de déccision, Random Forest et SVM ( Support Vector Machine .
Nous les avons entrainer sur les données d'entrainement de MNIST brute, puis sur les données normées. Nous avons également entrainer les modèles avec les meilleurs paramètre trouver avec GridSearchCV. Finalement, nous avons retenues le modèle SVM avec un accuracy de 0,98.
On a utilisé la stack MERN pour créer l'application, les modèles ont été entrainé avec Python.
Ce modèle pourra servir par exemple pour le secteur de la poste, le secteur bancaire ou pour résoudre des sudoku.

## Lancer l'application
<ol>
    <li>Récupérer le code source</li>
    <ol type="a">
        <li>Commande : git clone https://github.com/Samuelbella/projetannuel.git</li>
    </ol>
    <li>Lancer le serveur</li>
    <ol type="a">
        <li>Ouvrir un terminal dans le dossier projetannuel</li>
        <li>Commande : cd server</li>
        <li>Commande : npm install</li>
        <li>Commande : node Server.js</li>
    </ol>
    <li>Lancer l’application web</li>
    <ol type="a">
        <li>Ouvrir un autre terminal dans le dossier projetannuel</li>
        <li>Commande : cd web</li>
        <li>Commande : npm install</li>
        <li>Commande : npm start</li>
    </ol>
</ol>  

## Repartition des tâches

Lien Trello pour la repartition des tâches : [trello](https://trello.com/b/4DwD9kbA/projet-annuel)  

## Présentation orale

Lien Google Slides pour le support de la presentation : [google slide](https://docs.google.com/presentation/d/1NB8Hdx0a7YoTbRKg8IHtIaHNQdUkmOh35iCRCiks2Ts/edit?usp=sharing)  
