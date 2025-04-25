export default class Utilisateur {
    constructor(id, nom, email, password, dateInscription) {
        this.id = id;
        this.nom = nom;
        this.email = email;
        this.password = password; 
        this.dateInscription = dateInscription;
    }
    
    verifierMotDePasse(password) {
        return this.password === password;
    }

    modifierInformations(nom, email) {
        this.nom = nom;
        this.email = email;
    }

    modifierPassword(ancienPassword, nouveauPassword) {
        if (this.verifierMotDePasse(ancienPassword)) {
            this.password = nouveauPassword;
            return true;
        }
        return false;
    }
    
    static async getAll() {
        try {
            const response = await fetch(`${CONFIG.apiBaseUrl}/utilisateurs`);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const utilisateursData = await response.json();
            
            return utilisateursData.map(utilisateur => new Utilisateur(
                utilisateur.id,
                utilisateur.nom,
                utilisateur.email,
                null, // Ne pas charger le mot de passe pour des raisons de sécurité
                utilisateur.date_inscription
            ));
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
            return [];
        }
    }
    
    static async getById(id) {
        try {
            const response = await fetch(`${CONFIG.apiBaseUrl}/utilisateurs/${id}`);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const utilisateur = await response.json();
            
            return new Utilisateur(
                utilisateur.id,
                utilisateur.nom,
                utilisateur.email,
                null, // Ne pas charger le mot de passe pour des raisons de sécurité
                utilisateur.date_inscription
            );
        } catch (error) {
            console.error(`Erreur lors de la récupération de l'utilisateur ${id}:`, error);
            return null;
        }
    }
    
    static async create(utilisateur) {
        try {
            const response = await fetch(`${CONFIG.apiBaseUrl}/utilisateurs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nom: utilisateur.nom,
                    email: utilisateur.email,
                    password: utilisateur.password,
                    date_inscription: utilisateur.dateInscription
                })
            });
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const nouvelUtilisateur = await response.json();
            return new Utilisateur(
                nouvelUtilisateur.id,
                nouvelUtilisateur.nom,
                nouvelUtilisateur.email,
                null, // Ne pas retourner le mot de passe
                nouvelUtilisateur.date_inscription
            );
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur:', error);
            return null;
        }
    }
    
    static async update(id, utilisateur) {
        try {
            const data = {
                nom: utilisateur.nom,
                email: utilisateur.email
            };
            
            // Inclure le mot de passe uniquement s'il est présent
            if (utilisateur.password) {
                data.password = utilisateur.password;
            }
            
            const response = await fetch(`${CONFIG.apiBaseUrl}/utilisateurs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const utilisateurModifie = await response.json();
            return new Utilisateur(
                utilisateurModifie.id,
                utilisateurModifie.nom,
                utilisateurModifie.email,
                null, // Ne pas retourner le mot de passe
                utilisateurModifie.date_inscription
            );
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de l'utilisateur ${id}:`, error);
            return null;
        }
    }
    
    static async delete(id) {
        try {
            const response = await fetch(`${CONFIG.apiBaseUrl}/utilisateurs/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            return true;
        } catch (error) {
            console.error(`Erreur lors de la suppression de l'utilisateur ${id}:`, error);
            return false;
        }
    }
    toJSON() {
        // Ne pas inclure le mot de passe dans l'objet JSON
        return {
            id: this.id,
            nom: this.nom,
            email: this.email,
            dateInscription: this.dateInscription
        };
    }
}