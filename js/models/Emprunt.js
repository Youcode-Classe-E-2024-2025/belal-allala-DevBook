class Emprunt {
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
}