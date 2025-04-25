const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'devbook',
  password: 'belal',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

app.use(cors());
app.use(bodyParser.json());

pool.query('SELECT NOW()', (err) => {
  if (err) {
    console.error('Erreur de connexion à PostgreSQL:', err);
  } else {
    console.log('Connecté à PostgreSQL avec succès');
  }
});

app.get('/api/livres', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT l.*, c.nom as categorie_nom 
      FROM livres l
      LEFT JOIN categories c ON l.categorie_id = c.id
      ORDER BY l.titre
    `);
    res.json(rows);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/livres/:id', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT l.*, c.nom as categorie_nom 
      FROM livres l
      LEFT JOIN categories c ON l.categorie_id = c.id
      WHERE l.id = $1
    `, [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.post('/api/livres', async (req, res) => {
  const { titre, auteur, date_publication, categorie_id, statut } = req.body;
  
  if (!titre || !auteur) {
    return res.status(400).json({ error: 'Titre et auteur sont requis' });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO livres 
       (titre, auteur, date_publication, categorie_id, statut) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [titre, auteur, date_publication, categorie_id, statut || 'a-lire']
    );
    
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.put('/api/livres/:id', async (req, res) => {
  const { titre, auteur, date_publication, categorie_id, statut } = req.body;
  
  try {
    const { rows } = await pool.query(
      `UPDATE livres SET 
        titre = $1, 
        auteur = $2, 
        date_publication = $3, 
        categorie_id = $4, 
        statut = $5 
       WHERE id = $6 
       RETURNING *`,
      [titre, auteur, date_publication, categorie_id, statut, req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.delete('/api/livres/:id', async (req, res) => {
  try {
    const { rowCount } = await pool.query(
      'DELETE FROM livres WHERE id = $1',
      [req.params.id]
    );
    
    if (rowCount === 0) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }
    
    res.status(204).end();
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM categories ORDER BY nom');
    res.json(rows);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const { rows } = await pool.query(
      'SELECT id, nom, email FROM utilisateurs WHERE email = $1 AND password = $2',
      [email, password]
    );
    
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }
    
    res.json({ user: rows[0] });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/emprunts/en-retard', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT l.titre, u.nom as emprunteur, 
             e.date_retour_prevue, 
             CURRENT_DATE - e.date_retour_prevue as jours_retard
      FROM emprunts e
      JOIN livres l ON e.livre_id = l.id
      JOIN utilisateurs u ON e.utilisateur_id = u.id
      WHERE e.date_retour_effective IS NULL 
        AND e.date_retour_prevue < CURRENT_DATE
      ORDER BY jours_retard DESC
    `);
    
    res.json(rows);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.use((err, req, res, next) => {
  console.error('Erreur non gérée:', err);
  res.status(500).json({ error: 'Erreur serveur interne' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = { app, pool };

const jwt = require('jsonwebtoken');
require('dotenv').config();

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const { rows } = await pool.query(
      'SELECT id, nom, email, role FROM utilisateurs WHERE email = $1 AND password = crypt($2, password)',
      [email, password]
    );
    
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }
    
    const token = jwt.sign(
      { userId: rows[0].id, role: rows[0].role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ token, user: rows[0] });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/stats', authenticate, async (req, res) => {
    try {
      const stats = await Promise.all([
        pool.query('SELECT COUNT(*) FROM livres'),
        pool.query('SELECT COUNT(*) FROM livres WHERE statut = $1', ['disponible']),
        pool.query(`SELECT COUNT(*) FROM emprunts 
                    WHERE date_retour_effective IS NULL 
                    AND date_retour_prevue < CURRENT_DATE`)
      ]);
  
      res.json({
        totalLivres: parseInt(stats[0].rows[0].count),
        livresDisponibles: parseInt(stats[1].rows[0].count),
        livresEnRetard: parseInt(stats[2].rows[0].count)
      });
    } catch (error) {
      console.error('Erreur:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });