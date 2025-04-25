const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const path = require('path');

// Configuration
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.'))); // Servir les fichiers statiques

// Configuration de la base de données
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '', // À modifier selon votre configuration
    database: 'devbook'
};

// Pool de connexions
let pool;

// Initialisation de la base de données
async function initDb() {
    try {
        pool = mysql.createPool(dbConfig);
        console.log('Connexion à la base de données établie');
    } catch (error) {
        console.error('Erreur de connexion à la base de données:', error);
        process.exit(1);
    }
}

// Routes API pour les livres
app.get('/api/livres', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM livres');
        res.json(rows);
    } catch (error) {
        console.error('Erreur lors de la récupération des livres:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

app.get('/api/livres/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM livres WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Erreur lors de la récupération du livre:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

app.post('/api/livres', async (req, res) => {
    const { titre, auteur, date_publication, categorie_id, statut } = req.body;
    
    if (!titre || !auteur || !categorie_id || !statut) {
        return res.status(400).json({ message: 'Tous les champs requis doivent être remplis' });
    }
    
    try {
        const [result] = await pool.query(
            'INSERT INTO livres (titre, auteur, date_publication, categorie_id, statut) VALUES (?, ?, ?, ?, ?)',
            [titre, auteur, date_publication, categorie_id, statut]
        );
        
        res.status(201).json({
            id: result.insertId,
            titre,
            auteur,
            date_publication,
            categorie_id,
            statut
        });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du livre:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

app.put('/api/livres/:id', async (req, res) => {
    const { titre, auteur, date_publication, categorie_id, statut } = req.body;
    
    if (!titre || !auteur || !categorie_id || !statut) {
        return res.status(400).json({ message: 'Tous les champs requis doivent être remplis' });
    }
    
    try {
        const [result] = await pool.query(
            'UPDATE livres SET titre = ?, auteur = ?, date_publication = ?, categorie_id = ?, statut = ? WHERE id = ?',
            [titre, auteur, date_publication, categorie_id, statut, req.params.id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        
        res.json({
            id: parseInt(req.params.id),
            titre,
            auteur,
            date_publication,
            categorie_id,
            statut
        });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du livre:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

app.delete('/api/livres/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM livres WHERE id = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        
        res.status(204).end();
    } catch (error) {
        console.error('Erreur lors de la suppression du livre:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Routes API pour les catégories
app.get('/api/categories', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categories');
        res.json(rows);
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Routes API pour les emprunts
app.get('/api/emprunts', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT e.*, l.titre AS livre_titre, u.nom AS utilisateur_nom 
            FROM emprunts e
            JOIN livres l ON e.livre_id = l.id
            JOIN utilisateurs u ON e.utilisateur_id = u.id
        `);
        res.json(rows);
    } catch (error) {
        console.error('Erreur lors de la récupération des emprunts:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Route pour les requêtes spéciales
app.get('/api/stats/livres-par-categorie', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT c.id, c.nom, COUNT(l.id) AS nombre_livres
            FROM categories c
            LEFT JOIN livres l ON c.id = l.categorie_id
            GROUP BY c.id
            ORDER BY nombre_livres DESC
        `);
        res.json(rows);
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

app.get('/api/stats/top-livres/:annee/:mois', async (req, res) => {
    try {
        const { annee, mois } = req.params;
        
        const [rows] = await pool.query(`
            SELECT l.id, l.titre, l.auteur, COUNT(e.id) AS nombre_emprunts
            FROM livres l
            JOIN emprunts e ON l.id = e.livre_id
            WHERE YEAR(e.date_emprunt) = ? AND MONTH(e.date_emprunt) = ?
            GROUP BY l.id
            ORDER BY nombre_emprunts DESC
            LIMIT 10
        `, [annee, mois]);
        
        res.json(rows);
    } catch (error) {
        console.error('Erreur lors de la récupération du top des livres:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

app.get('/api/emprunts-par-date/:date', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT e.id, l.titre, u.nom AS emprunteur, e.date_emprunt, e.date_retour_prevue
            FROM emprunts e
            JOIN livres l ON e.livre_id = l.id
            JOIN utilisateurs u ON e.utilisateur_id = u.id
            WHERE DATE(e.date_emprunt) = ?
            ORDER BY e.id
        `, [req.params.date]);
        
        res.json(rows);
    } catch (error) {
        console.error('Erreur lors de la récupération des emprunts par date:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Démarrer le serveur
app.listen(PORT, async () => {
    await initDb();
    console.log(`Serveur démarré sur le port ${PORT}`);
});