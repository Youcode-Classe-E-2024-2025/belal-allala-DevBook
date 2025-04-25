export default class Livre {
    constructor(id, titre, auteur, datePublication, idCategorie, statut) {
        this.id = id;
        this.titre = titre;
        this.auteur = auteur;
        this.datePublication = datePublication;
        this.idCategorie = idCategorie;
        this.statut = statut; 
        this.nombreEmprunts = 0;
    }

    modifier(titre, auteur, datePublication, idCategorie) {
        this.titre = titre;
        this.auteur = auteur;
        this.datePublication = datePublication;
        this.idCategorie = idCategorie;
    }
 
    changerStatut(statut) {
        this.statut = statut;
    }
 
    supprimer() {
        console.log(`Suppression du livre ${this.titre}`);
    }
 
    incrementerEmprunts() {
        this.nombreEmprunts++;
        return this.nombreEmprunts;
    }
    
    
    static async getAll() {
        try {
            const response = await fetch(`${CONFIG.apiBaseUrl}/livres`);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const livresData = await response.json();
            
            return livresData.map(livre => new Livre(
                livre.id,
                livre.titre,
                livre.auteur,
                livre.date_publication,
                livre.categorie_id,
                livre.statut
            ));
        } catch (error) {
            console.error('Erreur lors de la récupération des livres:', error);
            return [];
        }
    }
    
    static async getById(id) {
        try {
            const response = await fetch(`${CONFIG.apiBaseUrl}/livres/${id}`);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const livre = await response.json();
            
            return new Livre(
                livre.id,
                livre.titre,
                livre.auteur,
                livre.date_publication,
                livre.categorie_id,
                livre.statut
            );
        } catch (error) {
            console.error(`Erreur lors de la récupération du livre ${id}:`, error);
            return null;
        }
    }
    
    static async create(livre) {
        try {
            const response = await fetch(`${CONFIG.apiBaseUrl}/livres`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    titre: livre.titre,
                    auteur: livre.auteur,
                    date_publication: livre.datePublication,
                    categorie_id: livre.idCategorie,
                    statut: livre.statut
                })
            });
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const nouveauLivre = await response.json();
            return new Livre(
                nouveauLivre.id,
                nouveauLivre.titre,
                nouveauLivre.auteur,
                nouveauLivre.date_publication,
                nouveauLivre.categorie_id,
                nouveauLivre.statut
            );
        } catch (error) {
            console.error('Erreur lors de la création du livre:', error);
            return null;
        }
    }
    
    static async update(id, livre) {
        try {
            const response = await fetch(`${CONFIG.apiBaseUrl}/livres/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    titre: livre.titre,
                    auteur: livre.auteur,
                    date_publication: livre.datePublication,
                    categorie_id: livre.idCategorie,
                    statut: livre.statut
                })
            });
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const livreModifie = await response.json();
            return new Livre(
                livreModifie.id,
                livreModifie.titre,
                livreModifie.auteur,
                livreModifie.date_publication,
                livreModifie.categorie_id,
                livreModifie.statut
            );
        } catch (error) {
            console.error(`Erreur lors de la mise à jour du livre ${id}:`, error);
            return null;
        }
    }
    
    static async delete(id) {
        try {
            const response = await fetch(`${CONFIG.apiBaseUrl}/livres/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            return true;
        } catch (error) {
            console.error(`Erreur lors de la suppression du livre ${id}:`, error);
            return false;
        }
    }
    
    toJSON() {
        return {
            id: this.id,
            titre: this.titre,
            auteur: this.auteur,
            datePublication: this.datePublication,
            idCategorie: this.idCategorie,
            statut: this.statut,
            nombreEmprunts: this.nombreEmprunts
        };
    }
}