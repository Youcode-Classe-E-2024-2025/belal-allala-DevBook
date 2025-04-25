// Routes API pour les utilisateurs
app.get('/api/utilisateurs', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, nom, email, date_inscription FROM utilisateurs');
        res.json(rows);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

app.get('/api/utilisateurs/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, nom, email, date_inscription FROM utilisateurs WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

app.post('/api/utilisateurs', async (req, res) => {
    const { nom, email, password, date_inscription } = req.body;
    
    if (!nom || !email || !password) {
        return res.status(400).json({ message: 'Tous les champs requis doivent être remplis' });
    }
    
    try {
        const [result] = await pool.query(
            'INSERT INTO utilisateurs (nom, email, password, date_inscription) VALUES (?, ?, ?, ?)',
            [nom, email, password, date_inscription || new Date()]
        );
        
        res.status(201).json({
            id: result.insertId,
            nom,
            email,
            date_inscription: date_inscription || new Date()
        });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

app.put('/api/utilisateurs/:id', async (req, res) => {
    const { nom, email, password } = req.body;
    
    if (!nom || !email) {
        return res.status(400).json({ message: 'Le nom et l\'email sont requis' });
    }
    
    try {
        let query, params;
        
        if (password) {
            query = 'UPDATE utilisateurs SET nom = ?, email = ?, password = ? WHERE id = ?';
            params = [nom, email, password, req.params.id];
        } else {
            query = 'UPDATE utilisateurs SET nom = ?, email = ? WHERE id = ?';
            params = [nom, email, req.params.id];
        }
        
        const [result] = await pool.query(query, params);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        
        const [rows] = await pool.query('SELECT id, nom, email, date_inscription FROM utilisateurs WHERE id = ?', [req.params.id]);
        
        res.json(rows[0]);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

app.delete('/api/utilisateurs/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM utilisateurs WHERE id = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        
        res.status(204).end();
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});