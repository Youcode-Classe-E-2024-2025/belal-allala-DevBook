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
    
    // Méthodes statiques pour la persistance
    static async getAll() {
        // Code pour récupérer toutes les catégories depuis l'API
    }
    
    static async getById(id) {
        // Code pour récupérer une catégorie par son ID depuis l'API
    }
    
    static async create(categorie) {
        // Code pour créer une catégorie via l'API
    }
    
    static async update(id, categorie) {
        // Code pour mettre à jour une catégorie via l'API
    }
    
    static async delete(id) {
        // Code pour supprimer une catégorie via l'API
    }
    
    toJSON() {
        return {
            id: this.id,
            nom: this.nom
        };
    }
}