# DevBook - Application de gestion de bibliothèque pour développeurs

Une application web permettant aux développeurs de gérer leur collection de livres techniques.

## Fonctionnalités

- Ajouter, modifier et supprimer des livres
- Organiser les livres par catégories
- Suivre les livres lus, en cours ou à lire
- Rechercher et trier la liste des livres
- Système de prêt et d'emprunt de livres

## Technologies utilisées

- JavaScript (ES6+)
- HTML5 & CSS3
- NodeJS avec Express
- MySQL
- Architecture MVC & POO

## Installation

1. Cloner le dépôt
2. Installer les dépendances avec `npm install`
3. Configurer la base de données MySQL (voir le fichier sql/devbook.sql)
4. Lancer le serveur avec `npm start`




contenu de brief :
DevBook est une application web permettant aux utilisateurs (développeurs) de gérer une collection de livres techniques (programmation, design, architecture, etc.). Elle doit permettre de : - Ajouter/modifier/supprimer des livres, - Organiser les livres par catégories, - Suivre les livres lus/en cours/à lire, - Rechercher et trier la liste, - Visualiser les données de manière dynamique côté client en JavaScript avec pagination. Ce projet met en œuvre JavaScript, SQL, Programmation Orientée Objet, et UML pour former une application complète.

**Contexte du projet**
Les développeurs consultent énormément de ressources écrites (livres, ebooks, docs). DevBook leur offre un moyen simple de garder une trace de leurs lectures, classées par technologie, niveau ou statut de lecture. C’est aussi une opportunité pédagogique de construire une application full stack sans framework, en partant des fondamentaux.

🔧 Fonctionnalités principales de DevBook :
* Interface HTML+JS affichant une liste dynamique de livres.
* Ajout d’un nouveau livre via un formulaire DOM.
* Mise à jour et suppression d’un livre de la liste.
* Filtrage, pagination et tri (par statut, auteur, catégorie).
* Base de données SQL pour stocker les livres et les catégories.
* Back-end avec NodeJS.
* Classes en JavaScript ou TypeScript : Livre, Utilisateur, etc.
* Diagrammes UML : use case et diagramme de classes.

💽 Requêtes SQL demandées :
* Afficher la liste des tous les utiisateurs qui ont empruntés le livre ainsi que leur nombre trié par date descendant.
* Afficher la liste des livres qui n'ont toujours pas été rendu alors qu'il ont dépassé la date d'échéance d'emprunt.
* Afficher les catégories ainsi que le nombre de livre par catégorie.
* Afficher en premier la catégorie ayant les livres les plus empruntés.
* Afficher tous les emprunts effectués à la date selectionnée par le billet d'un formulaire.
* Afficher le top 10 des livres qui ont été le plus empruntés au courant d'un mois selectionné.

**Livrables**
-- Jour 1 -- Tâches clés : 🔹 Analyse fonctionnelle. 🔹 Définition des acteurs et besoins. 🔹 Rédaction du diagramme de cas d’utilisation + descriptions. Livrables : ✅ Document UML use case. ✅ Début de la base HTML/JS. -- Jour 2 -- Tâches clés : 🔹 Création du diagramme de classes UML. 🔹 Développement des classes JS ou TS : Livre, Utilisateur, Catégorie, Emprunt. 🔹 Base de données SQL : création des tables + insertion test. Livrables : ✅ Diagramme de classes. ✅ Code objet structuré. ✅ Script SQL de création. -- Jour 3 -- Tâches clés : 🔹 Développement JavaScript : formulaire, affichage dynamique, événements DOM. 🔹 SQL : ajout des requêtes de jointures. 🔹 Connexion backend/front-end. Livrables : ✅ Interface dynamique avec JS. ✅ Résultats de requêtes SQL jointes. -- Jour 4-5 -- Tâches clés : 🔹 Finalisation de la logique objet. 🔹 Mise en forme de l’interface. 🔹 Préparation de la soutenance avec explication UML + démo JS. Livrables : ✅ Projet complet avec CRUD JS. ✅ Diagrammes UML.

**Critères de performance**
JavaScript 🔸 Utilisation correcte des types, objets, fonctions, boucles. 🔸 DOM manipulé proprement. 🔸 Événements bien gérés. SQL 🔸 Structure relationnelle correcte. 🔸 Présence de clés étrangères. 🔸 Requêtes avec jointures fonctionnelles. POO 🔸 Deux classes minimum, constructeurs et méthodes bien utilisés. 🔸 Utilisation de l’encapsulation et éventuellement de l’héritage. Conception UML 🔸 Diagrammes clairs, complets et alignés avec le code. Pédagogie & gestion de projet 🔸 Organisation visible sur GitHub. 🔸 Commits clairs. 🔸 Présentation structurée et fluide.