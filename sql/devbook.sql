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