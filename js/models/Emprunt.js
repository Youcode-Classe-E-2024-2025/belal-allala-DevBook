export default class Emprunt {
    constructor(id, idLivre, idUser, dateEmprunt, dateRetourPrevue, dateRetourEffective = null) {
        this.id = id;
        this.idLivre = idLivre;
        this.idUser = idUser;
        this.dateEmprunt = dateEmprunt;
        this.dateRetourPrevue = dateRetourPrevue;
        this.dateRetourEffective = dateRetourEffective;
    }
    
    retourner(dateRetour) {
        this.dateRetourEffective = dateRetour;
    }

    modifierRetour(nouvelleDateRetourPrevue) {
        this.dateRetourPrevue = nouvelleDateRetourPrevue;
    }

    estEnRetard() {
        return this.dateRetourEffective === null && new Date() > new Date(this.dateRetourPrevue);
    }
    
    static async getAll() {
        try {
            const response = await fetch(`${CONFIG.apiBaseUrl}/emprunts`);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const empruntsData = await response.json();
            
            return empruntsData.map(emprunt => new Emprunt(
                emprunt.id,
                emprunt.livre_id,
                emprunt.utilisateur_id,
                emprunt.date_emprunt,
                emprunt.date_retour_prevue,
                emprunt.date_retour_effective
            ));
        } catch (error) {
            console.error('Erreur lors de la récupération des emprunts:', error);
            return [];
        }
    }
    
    static async getById(id) {
        try {
            const response = await fetch(`${CONFIG.apiBaseUrl}/emprunts/${id}`);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const emprunt = await response.json();
            
            return new Emprunt(
                emprunt.id,
                emprunt.livre_id,
                emprunt.utilisateur_id,
                emprunt.date_emprunt,
                emprunt.date_retour_prevue,
                emprunt.date_retour_effective
            );
        } catch (error) {
            console.error(`Erreur lors de la récupération de l'emprunt ${id}:`, error);
            return null;
        }
    }
    
    static async getByLivre(idLivre) {
        try {
            const response = await fetch(`${CONFIG.apiBaseUrl}/emprunts?livre_id=${idLivre}`);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const empruntsData = await response.json();
            
            return empruntsData.map(emprunt => new Emprunt(
                emprunt.id,
                emprunt.livre_id,
                emprunt.utilisateur_id,
                emprunt.date_emprunt,
                emprunt.date_retour_prevue,
                emprunt.date_retour_effective
            ));
        } catch (error) {
            console.error(`Erreur lors de la récupération des emprunts du livre ${idLivre}:`, error);
            return [];
        }
    }
    
    static async getByUser(idUser) {
        try {
            const response = await fetch(`${CONFIG.apiBaseUrl}/emprunts?utilisateur_id=${idUser}`);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const empruntsData = await response.json();
            
            return empruntsData.map(emprunt => new Emprunt(
                emprunt.id,
                emprunt.livre_id,
                emprunt.utilisateur_id,
                emprunt.date_emprunt,
                emprunt.date_retour_prevue,
                emprunt.date_retour_effective
            ));
        } catch (error) {
            console.error(`Erreur lors de la récupération des emprunts de l'utilisateur ${idUser}:`, error);
            return [];
        }
    }
    
    static async create(emprunt) {
        try {
            const response = await fetch(`${CONFIG.apiBaseUrl}/emprunts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    livre_id: emprunt.idLivre,
                    utilisateur_id: emprunt.idUser,
                    date_emprunt: emprunt.dateEmprunt,
                    date_retour_prevue: emprunt.dateRetourPrevue,
                    date_retour_effective: emprunt.dateRetourEffective
                })
            });
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const nouvelEmprunt = await response.json();
            return new Emprunt(
                nouvelEmprunt.id,
                nouvelEmprunt.livre_id,
                nouvelEmprunt.utilisateur_id,
                nouvelEmprunt.date_emprunt,
                nouvelEmprunt.date_retour_prevue,
                nouvelEmprunt.date_retour_effective
            );
        } catch (error) {
            console.error('Erreur lors de la création de l\'emprunt:', error);
            return null;
        }
    }
    
    static async update(id, emprunt) {
        try {
            const response = await fetch(`${CONFIG.apiBaseUrl}/emprunts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    livre_id: emprunt.idLivre,
                    utilisateur_id: emprunt.idUser,
                    date_emprunt: emprunt.dateEmprunt,
                    date_retour_prevue: emprunt.dateRetourPrevue,
                    date_retour_effective: emprunt.dateRetourEffective
                })
            });
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const empruntModifie = await response.json();
            return new Emprunt(
                empruntModifie.id,
                empruntModifie.livre_id,
                empruntModifie.utilisateur_id,
                empruntModifie.date_emprunt,
                empruntModifie.date_retour_prevue,
                empruntModifie.date_retour_effective
            );
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de l'emprunt ${id}:`, error);
            return null;
        }
    }
    
    static async delete(id) {
        try {
            const response = await fetch(`${CONFIG.apiBaseUrl}/emprunts/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            return true;
        } catch (error) {
            console.error(`Erreur lors de la suppression de l'emprunt ${id}:`, error);
            return false;
        }
    }
    
    toJSON() {
        return {
            id: this.id,
            idLivre: this.idLivre,
            idUser: this.idUser,
            dateEmprunt: this.dateEmprunt,
            dateRetourPrevue: this.dateRetourPrevue,
            dateRetourEffective: this.dateRetourEffective
        };
    }
}