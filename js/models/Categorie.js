export default class Categorie {
    constructor(id, nom) {
        this.id = id;
        this.nom = nom;
    }
    
    modifier(nom) {
        this.nom = nom;
    }

    supprimer() {
        console.log(`Suppression de la catégorie ${this.nom}`);
    }
    
    static async getAll() {
        try {
            const response = await fetch(`${CONFIG.apiBaseUrl}/categories`);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const categoriesData = await response.json();
            
            return categoriesData.map(categorie => new Categorie(
                categorie.id,
                categorie.nom
            ));
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories:', error);
            return [];
        }
    }
    
    static async getById(id) {
        try {
            const response = await fetch(`${CONFIG.apiBaseUrl}/categories/${id}`);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const categorie = await response.json();
            
            return new Categorie(
                categorie.id,
                categorie.nom
            );
        } catch (error) {
            console.error(`Erreur lors de la récupération de la catégorie ${id}:`, error);
            return null;
        }
    }
    
    static async create(categorie) {
        try {
            const response = await fetch(`${CONFIG.apiBaseUrl}/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nom: categorie.nom
                })
            });
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const nouvelleCategorie = await response.json();
            return new Categorie(
                nouvelleCategorie.id,
                nouvelleCategorie.nom
            );
        } catch (error) {
            console.error('Erreur lors de la création de la catégorie:', error);
            return null;
        }
    }
    
    static async update(id, categorie) {
        try {
            const response = await fetch(`${CONFIG.apiBaseUrl}/categories/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nom: categorie.nom
                })
            });
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const categorieModifiee = await response.json();
            return new Categorie(
                categorieModifiee.id,
                categorieModifiee.nom
            );
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de la catégorie ${id}:`, error);
            return null;
        }
    }
    
    static async delete(id) {
        try {
            const response = await fetch(`${CONFIG.apiBaseUrl}/categories/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            return true;
        } catch (error) {
            console.error(`Erreur lors de la suppression de la catégorie ${id}:`, error);
            return false;
        }
    }
    
    toJSON() {
        return {
            id: this.id,
            nom: this.nom
        };
    }
}