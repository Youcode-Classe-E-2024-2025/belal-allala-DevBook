-- 1. Afficher la liste des tous les utilisateurs qui ont emprunté le livre ainsi que leur nombre trié par date descendant
SELECT l.titre, u.nom as utilisateur, COUNT(e.id) as nombre_emprunts 
FROM emprunts e 
JOIN utilisateurs u ON e.utilisateur_id = u.id 
JOIN livres l ON e.livre_id = l.id 
WHERE l.id = 1  -- Remplacer par l'ID du livre souhaité
GROUP BY u.id 
ORDER BY e.date_emprunt DESC;

-- 2. Afficher la liste des livres qui n'ont toujours pas été rendus alors qu'ils ont dépassé la date d'échéance d'emprunt
SELECT l.id, l.titre, u.nom as emprunteur, e.date_retour_prevue, 
       DATEDIFF(CURRENT_DATE, e.date_retour_prevue) as jours_retard
FROM emprunts e
JOIN livres l ON e.livre_id = l.id
JOIN utilisateurs u ON e.utilisateur_id = u.id
WHERE e.date_retour_effective IS NULL 
  AND e.date_retour_prevue < CURRENT_DATE
ORDER BY jours_retard DESC;

-- 3. Afficher les catégories ainsi que le nombre de livre par catégorie
SELECT c.id, c.nom, COUNT(l.id) as nombre_livres
FROM categories c
LEFT JOIN livres l ON c.id = l.categorie_id
GROUP BY c.id
ORDER BY nombre_livres DESC;

-- 4. Afficher en premier la catégorie ayant les livres les plus empruntés
SELECT c.id, c.nom, COUNT(e.id) as nombre_emprunts
FROM categories c
JOIN livres l ON c.id = l.categorie_id
JOIN emprunts e ON l.id = e.livre_id
GROUP BY c.id
ORDER BY nombre_emprunts DESC;

-- 5. Afficher tous les emprunts effectués à la date sélectionnée par le billet d'un formulaire
-- Préparation de la requête (à exécuter via une variable)
SELECT e.id, l.titre, u.nom as emprunteur, e.date_emprunt, e.date_retour_prevue
FROM emprunts e
JOIN livres l ON e.livre_id = l.id
JOIN utilisateurs u ON e.utilisateur_id = u.id
WHERE DATE(e.date_emprunt) = ?  -- La date sera fournie par le formulaire
ORDER BY e.id;

-- 6. Afficher le top 10 des livres qui ont été le plus empruntés au cours d'un mois sélectionné
-- Préparation de la requête (à exécuter via des variables)
SELECT l.id, l.titre, l.auteur, COUNT(e.id) AS nombre_emprunts
FROM livres l
JOIN emprunts e ON l.id = e.livre_id
WHERE YEAR(e.date_emprunt) = ?  -- L'année sera fournie par le formulaire
  AND MONTH(e.date_emprunt) = ?  -- Le mois sera fourni par le formulaire
GROUP BY l.id
ORDER BY nombre_emprunts DESC
LIMIT 10;


-- Requête 1: Livres en retard
SELECT l.titre, u.nom, e.date_retour_prevue, DATEDIFF(NOW(), e.date_retour_prevue) AS jours_retard
FROM emprunts e
JOIN livres l ON e.livre_id = l.id
JOIN utilisateurs u ON e.utilisateur_id = u.id
WHERE e.date_retour_effective IS NULL AND e.date_retour_prevue < NOW();

-- Requête 2: Top 10 livres par mois
SELECT l.titre, COUNT(e.id) AS nombre_emprunts
FROM livres l
JOIN emprunts e ON l.id = e.livre_id
WHERE MONTH(e.date_emprunt) = 3 AND YEAR(e.date_emprunt) = 2024  -- Mars 2024
GROUP BY l.id
ORDER BY nombre_emprunts DESC
LIMIT 10;