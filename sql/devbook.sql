DROP TABLE IF EXISTS emprunts;
DROP TABLE IF EXISTS livres;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS utilisateurs;

CREATE TABLE utilisateurs (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, 
    date_inscription DATE
);

CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE livres (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL,
    auteur VARCHAR(255) NOT NULL,
    date_publication DATE,
    categorie_id INTEGER,
    statut VARCHAR(50),
    nombre_emprunts INTEGER DEFAULT 0,
    date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categorie_id) REFERENCES categories(id)
);

CREATE TABLE emprunts (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    livre_id INTEGER,
    utilisateur_id INTEGER,
    date_emprunt DATE NOT NULL,
    date_retour_prevue DATE NOT NULL,
    date_retour_effective DATE,
    FOREIGN KEY (livre_id) REFERENCES livres(id),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);

-- Insertion de données de test
-- Utilisateurs
INSERT INTO utilisateurs (nom, email, password, date_inscription) VALUES
('Jean Dupont', 'jean@example.com', 'password123', '2024-01-15'),
('Marie Martin', 'marie@example.com', 'password456', '2024-02-20'),
('Pierre Durand', 'pierre@example.com', 'password789', '2024-03-25');

-- Catégories
INSERT INTO categories (nom) VALUES
('JavaScript'),
('Python'),
('DevOps'),
('Architecture logicielle'),
('Bases de données'),
('Front-end'),
('Back-end');

-- Livres
INSERT INTO livres (titre, auteur, date_publication, categorie_id, statut) VALUES
('JavaScript: The Good Parts', 'Douglas Crockford', '2008-05-01', 1, 'lu'),
('Eloquent JavaScript', 'Marijn Haverbeke', '2018-12-04', 1, 'en-cours'),
('Python Crash Course', 'Eric Matthes', '2019-05-03', 2, 'a-lire'),
('Learning Python', 'Mark Lutz', '2013-06-12', 2, 'lu'),
('Docker in Action', 'Jeff Nickoloff', '2016-03-27', 3, 'en-cours'),
('Clean Architecture', 'Robert C. Martin', '2017-09-10', 4, 'lu'),
('SQL Performance Explained', 'Markus Winand', '2012-07-01', 5, 'a-lire'),
('CSS Secrets', 'Lea Verou', '2015-06-15', 6, 'lu'),
('Node.js Design Patterns', 'Mario Casciaro', '2016-07-18', 7, 'a-lire');

-- Emprunts
INSERT INTO emprunts (livre_id, utilisateur_id, date_emprunt, date_retour_prevue, date_retour_effective) VALUES
(1, 1, '2024-02-01', '2024-02-15', '2024-02-12'),
(2, 1, '2024-03-10', '2024-03-24', NULL),
(3, 2, '2024-03-05', '2024-03-19', '2024-03-18'),
(4, 2, '2024-04-01', '2024-04-15', NULL),
(5, 3, '2024-03-20', '2024-04-03', NULL),
(6, 3, '2024-02-10', '2024-02-24', '2024-02-22');