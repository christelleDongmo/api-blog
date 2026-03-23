# API de gestion d’articles de blog

## Présentation

Ce projet consiste en la réalisation d’une API REST permettant la gestion d’articles de blog.  
L’application a été développée avec **Node.js**, **Express.js** et **MySQL**.

L’API permet d’effectuer les opérations suivantes :

- créer un article ;
- afficher tous les articles ;
- afficher un article à partir de son identifiant ;
- modifier un article ;
- supprimer un article ;
- rechercher un article à partir d’un mot-clé.

Une documentation interactive de l’API a été mise en place grâce à **Swagger**.

---

## Objectifs

L’objectif de ce projet est de mettre en pratique :

- la création d’un serveur backend avec Node.js et Express ;
- la conception d’une API REST ;
- la connexion à une base de données MySQL ;
- l’exécution des opérations CRUD ;
- la documentation d’une API avec Swagger ;
- l’utilisation d’un fichier `.env` pour gérer les variables d’environnement.

---

## Technologies utilisées

- Node.js
- Express.js
- MySQL
- mysql2
- Swagger UI
- swagger-jsdoc
- dotenv

---

## Structure du projet
api-articles/
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── src/
    ├── app.js
    ├── config/
    │   └── db.js
    ├── controllers/
    │   └── articleController.js
    ├── routes/
    │   └── articleRoutes.js
    └── models/

## Inatallation et execution

1.Cloner le depot

git clone https://github.com/christelleDongmo/api-blog.git
cd api-articles

2.Installer les dependances

npm install

3.Configurer les variables d'environnement

Creer un fichier .env a la racine du projet en s'inspirant de .env.example.

4.Creer la base de donnees

Executer les commandes SQL suivantes dans MySQL :
CREATE DATABASE api_articles;

USE api_articles;

CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    contenu TEXT,
    auteur VARCHAR(255) NOT NULL,
    categorie VARCHAR(100),
    hashtags TEXT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

5.Lancer le serveur

taper cette commande dans le dossier du projet
node src/app.js

Endpoints disponibles
GET /api/articles : récupérer tous les articles
POST /api/articles : créer un article
GET /api/articles/:id : récupérer un article par son identifiant
PUT /api/articles/:id : modifier un article
DELETE /api/articles/:id : supprimer un article
GET /api/articles/search?query=mot : rechercher des articles

Exemple de requête
Création d’un article
Bash

curl -X POST http://localhost:5000/api/articles \
-H "Content-Type: application/json" \
-d '{"titre":"Mon article","contenu":"Contenu test","auteur":"Christie","categorie":"Tech","hashtags":["node","mysql"]}'

Documentation de l’API
La documentation Swagger est accessible à l’adresse suivante :

Bash

http://localhost:5000/api-docs

Elle permet de visualiser et de tester les différentes routes de l’API.

## Sécurité et configuration
Les informations sensibles, comme les paramètres de connexion à la base de données, sont stockées dans un fichier .env.
Ce fichier n’est pas versionné grâce au fichier .gitignore.

## Auteur
Projet réalisé par CHRISTELLE DONGMO dans le cadre du TP de l'UE INF222 EC2.
