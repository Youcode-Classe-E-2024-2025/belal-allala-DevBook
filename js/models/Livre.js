class Livre {
    constructor(id, titre, auteur, datePublication, idCategorie, statut) {
    this.id = id;
    this.titre = titre;
    this.auteur = auteur;
    this.datePublication = datePublication;
    this.idCategorie = idCategorie;
    this.statut = statut; 
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
    }
 
    incrementerEmprunts() {
    }
}