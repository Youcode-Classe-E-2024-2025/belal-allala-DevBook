class Utilisateur {
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

}