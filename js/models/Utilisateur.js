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
    
    // Méthodes statiques pour la persistance
    static async getAll() {
        // Code pour récupérer tous les utilisateurs depuis l'API
    }
    
    static async getById(id) {
        // Code pour récupérer un utilisateur par son ID depuis l'API
    }
    
    static async create(utilisateur) {
        // Code pour créer un utilisateur via l'API
    }
    
    static async update(id, utilisateur) {
        // Code pour mettre à jour un utilisateur via l'API
    }
    
    static async delete(id) {
        // Code pour supprimer un utilisateur via l'API
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