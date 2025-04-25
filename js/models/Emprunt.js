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
    
    // Méthodes statiques pour la persistance
    static async getAll() {
        // Code pour récupérer tous les emprunts depuis l'API
    }
    
    static async getById(id) {
        // Code pour récupérer un emprunt par son ID depuis l'API
    }
    
    static async getByLivre(idLivre) {
        // Code pour récupérer les emprunts d'un livre depuis l'API
    }
    
    static async getByUser(idUser) {
        // Code pour récupérer les emprunts d'un utilisateur depuis l'API
    }
    
    static async create(emprunt) {
        // Code pour créer un emprunt via l'API
    }
    
    static async update(id, emprunt) {
        // Code pour mettre à jour un emprunt via l'API
    }
    
    static async delete(id) {
        // Code pour supprimer un emprunt via l'API
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