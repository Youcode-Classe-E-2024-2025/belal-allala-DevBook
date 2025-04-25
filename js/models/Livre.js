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
        // Code pour récupérer tous les livres depuis l'API
    }
    
    static async getById(id) {
        // Code pour récupérer un livre par son ID depuis l'API
    }
    
    static async create(livre) {
        // Code pour créer un livre via l'API
    }
    
    static async update(id, livre) {
        // Code pour mettre à jour un livre via l'API
    }
    
    static async delete(id) {
        // Code pour supprimer un livre via l'API
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