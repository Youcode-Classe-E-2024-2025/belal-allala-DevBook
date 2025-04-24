import Livre from './models/Livre.js';
import Utilisateur from './models/Utilisateur.js';
import Categorie from './models/Categorie.js';
import Emprunt from './models/Emprunt.js';

const booksData = [
    { id: 1, titre: 'Clean Code', auteur: 'Robert C. Martin', categorie: 'Programmation', statut: 'lu' },
    { id: 2, titre: 'The Design of Everyday Things', auteur: 'Don Norman', categorie: 'Design', statut: 'en cours' },
    { id: 3, titre: 'Patterns of Enterprise Application Architecture', auteur: 'Martin Fowler', categorie: 'Architecture Logicielle', statut: 'à lire' },
    { id: 4, titre: 'Scrum: The Art of Doing Twice the Work in Half the Time', auteur: 'Jeff Sutherland', categorie: 'Gestion de Projet', statut: 'lu' },
    { id: 5, titre: 'Eloquent JavaScript', auteur: 'Marijn Haverbeke', categorie: 'Programmation', statut: 'en cours' },
];

document.addEventListener('DOMContentLoaded', () => {
    const bookListContainer = document.getElementById('book-list-container'); 
    if (bookListContainer) {
        renderBookList(initialBooks, bookListContainer);
    } else {
        console.error("L'élément avec l'ID 'book-list-container' n'a pas été trouvé dans le DOM.");
    }
});