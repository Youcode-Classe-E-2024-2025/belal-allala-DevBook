// Importation des classes
import Livre from './models/Livre.js';
import Utilisateur from './models/Utilisateur.js';
import Categorie from './models/Categorie.js';
import Emprunt from './models/Emprunt.js';

// Configuration de l'application
const CONFIG = {
    itemsPerPage: 6,
    apiBaseUrl: 'http://localhost:3000/api'
};

// État de l'application
const state = {
    livres: [],
    categories: [],
    utilisateurs: [],
    emprunts: [],
    currentPage: 1,
    filtreCategorie: '',
    filtreStatut: '',
    recherche: '',
    tri: 'titre',
    livreEditId: null
};

// Éléments DOM
const elements = {
    livresContainer: document.querySelector('.livres-container'),
    pagination: document.querySelector('.pagination'),
    recherche: document.getElementById('recherche'),
    btnRecherche: document.getElementById('btn-recherche'),
    filtreCategorie: document.getElementById('filtre-categorie'),
    filtreStatut: document.getElementById('filtre-statut'),
    tri: document.getElementById('tri'),
    btnAjouter: document.getElementById('btn-ajouter'),
    formLivre: document.getElementById('form-livre'),
    modalLivre: document.getElementById('formulaire-livre'),
    btnFermerModal: document.querySelector('.close'),
    btnAnnulerForm: document.querySelector('.btn-secondaire'),
    categorieSelect: document.getElementById('categorie')
};

// Fonctions d'initialisation
async function initApp() {
    try {
        await Promise.all([
            chargerCategories(),
            chargerLivres()
        ]);
        
        setupEventListeners();
        renderLivres();
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de l\'application:', error);
    }
}

// Fonctions de chargement des données
async function chargerCategories() {
    try {
        // Pour le moment, utilisons des données codées en dur
        state.categories = [
            new Categorie(1, 'JavaScript'),
            new Categorie(2, 'Python'),
            new Categorie(3, 'DevOps'),
            new Categorie(4, 'Architecture logicielle'),
            new Categorie(5, 'Bases de données'),
            new Categorie(6, 'Front-end'),
            new Categorie(7, 'Back-end')
        ];
        
        renderCategoriesSelect();
    } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
    }
}

async function chargerLivres() {
    try {
        // Pour le moment, utilisons des données codées en dur
        state.livres = [
            new Livre(1, 'JavaScript: The Good Parts', 'Douglas Crockford', '2008-05-01', 1, 'lu'),
            new Livre(2, 'Eloquent JavaScript', 'Marijn Haverbeke', '2018-12-04', 1, 'en-cours'),
            new Livre(3, 'Python Crash Course', 'Eric Matthes', '2019-05-03', 2, 'a-lire'),
            new Livre(4, 'Learning Python', 'Mark Lutz', '2013-06-12', 2, 'lu'),
            new Livre(5, 'Docker in Action', 'Jeff Nickoloff', '2016-03-27', 3, 'en-cours'),
            new Livre(6, 'Clean Architecture', 'Robert C. Martin', '2017-09-10', 4, 'lu'),
            new Livre(7, 'SQL Performance Explained', 'Markus Winand', '2012-07-01', 5, 'a-lire'),
            new Livre(8, 'CSS Secrets', 'Lea Verou', '2015-06-15', 6, 'lu'),
            new Livre(9, 'Node.js Design Patterns', 'Mario Casciaro', '2016-07-18', 7, 'a-lire')
        ];
    } catch (error) {
        console.error('Erreur lors du chargement des livres:', error);
    }
}

// Fonctions d'initialisation des écouteurs d'événements
function setupEventListeners() {
    // Événements de recherche et filtrage
    elements.btnRecherche.addEventListener('click', handleRecherche);
    elements.recherche.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleRecherche();
    });
    elements.filtreCategorie.addEventListener('change', handleFiltreCategorie);
    elements.filtreStatut.addEventListener('change', handleFiltreStatut);
    elements.tri.addEventListener('change', handleTri);
    
    // Événements pour le formulaire
    elements.btnAjouter.addEventListener('click', handleAfficherFormAjout);
    elements.btnFermerModal.addEventListener('click', handleFermerModal);
    elements.btnAnnulerForm.addEventListener('click', handleFermerModal);
    elements.formLivre.addEventListener('submit', handleSoumettreFormLivre);
    
    // Délégation d'événements pour les actions sur les livres
    elements.livresContainer.addEventListener('click', handleLivreActions);
}

// Gestionnaires d'événements
function handleRecherche() {
    state.recherche = elements.recherche.value.trim().toLowerCase();
    state.currentPage = 1;
    renderLivres();
}

function handleFiltreCategorie() {
    state.filtreCategorie = elements.filtreCategorie.value;
    state.currentPage = 1;
    renderLivres();
}

function handleFiltreStatut() {
    state.filtreStatut = elements.filtreStatut.value;
    state.currentPage = 1;
    renderLivres();
}

function handleTri() {
    state.tri = elements.tri.value;
    renderLivres();
}

function handleAfficherFormAjout() {
    // Réinitialiser le formulaire
    elements.formLivre.reset();
    state.livreEditId = null;
    document.querySelector('.modal h2').textContent = 'Ajouter un livre';
    
    // Afficher le modal
    elements.modalLivre.style.display = 'flex';
}

function handleFermerModal() {
    elements.modalLivre.style.display = 'none';
}

function handleSoumettreFormLivre(e) {
    e.preventDefault();
    
    const titreValue = document.getElementById('titre').value.trim();
    const auteurValue = document.getElementById('auteur').value.trim();
    const datePublicationValue = document.getElementById('date-publication').value;
    const categorieValue = parseInt(document.getElementById('categorie').value);
    const statutValue = document.getElementById('statut').value;
    
    if (state.livreEditId) {
        // Mode édition
        const livre = state.livres.find(l => l.id === state.livreEditId);
        if (livre) {
            livre.modifier(titreValue, auteurValue, datePublicationValue, categorieValue);
            livre.changerStatut(statutValue);
        }
    } else {
        // Mode ajout
        const newId = state.livres.length > 0 ? Math.max(...state.livres.map(l => l.id)) + 1 : 1;
        const newLivre = new Livre(newId, titreValue, auteurValue, datePublicationValue, categorieValue, statutValue);
        state.livres.push(newLivre);
    }
    
    // Fermer le modal et rafraîchir la liste
    handleFermerModal();
    renderLivres();
}

function handleLivreActions(e) {
    const target = e.target;
    
    // Vérifier si c'est un bouton d'action
    if (target.classList.contains('action-modifier')) {
        const livreId = parseInt(target.dataset.id);
        handleEditerLivre(livreId);
    } else if (target.classList.contains('action-supprimer')) {
        const livreId = parseInt(target.dataset.id);
        handleSupprimerLivre(livreId);
    }
}

function handleEditerLivre(id) {
    const livre = state.livres.find(l => l.id === id);
    if (!livre) return;
    
    // Remplir le formulaire avec les données du livre
    document.getElementById('titre').value = livre.titre;
    document.getElementById('auteur').value = livre.auteur;
    document.getElementById('date-publication').value = livre.datePublication;
    document.getElementById('categorie').value = livre.idCategorie;
    document.getElementById('statut').value = livre.statut;
    
    // Mettre à jour l'ID du livre en cours d'édition
    state.livreEditId = id;
    
    // Changer le titre du modal
    document.querySelector('.modal h2').textContent = 'Modifier le livre';
    
    // Afficher le modal
    elements.modalLivre.style.display = 'flex';
}

function handleSupprimerLivre(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
        const index = state.livres.findIndex(l => l.id === id);
        if (index !== -1) {
            state.livres[index].supprimer();
            state.livres.splice(index, 1);
            renderLivres();
        }
    }
}

// Fonctions de rendu
function renderLivres() {
    // Filtrer les livres
    const livresFiltres = state.livres.filter(livre => {
        const matchRecherche = state.recherche === '' || 
            livre.titre.toLowerCase().includes(state.recherche) || 
            livre.auteur.toLowerCase().includes(state.recherche);
        
        const matchCategorie = state.filtreCategorie === '' || 
            livre.idCategorie === parseInt(state.filtreCategorie);
        
        const matchStatut = state.filtreStatut === '' || 
            livre.statut === state.filtreStatut;
        
        return matchRecherche && matchCategorie && matchStatut;
    });
    
    // Trier les livres
    livresFiltres.sort((a, b) => {
        switch (state.tri) {
            case 'titre':
                return a.titre.localeCompare(b.titre);
            case 'auteur':
                return a.auteur.localeCompare(b.auteur);
            case 'date':
                return new Date(b.datePublication) - new Date(a.datePublication);
            default:
                return 0;
        }
    });
    
    // Calculer la pagination
    const totalPages = Math.ceil(livresFiltres.length / CONFIG.itemsPerPage);
    const startIndex = (state.currentPage - 1) * CONFIG.itemsPerPage;
    const livresPage = livresFiltres.slice(startIndex, startIndex + CONFIG.itemsPerPage);
    
    // Générer le HTML pour les livres
    let livresHTML = '';
    
    if (livresPage.length === 0) {
        livresHTML = '<div class="no-results">Aucun livre ne correspond à votre recherche.</div>';
    } else {
        livresPage.forEach(livre => {
            const categorie = state.categories.find(c => c.id === livre.idCategorie);
            const categorieNom = categorie ? categorie.nom : 'Non catégorisé';
            
            let statutLabel, statutClass;
            switch (livre.statut) {
                case 'lu':
                    statutLabel = 'Lu';
                    statutClass = 'badge-lu';
                    break;
                case 'en-cours':
                    statutLabel = 'En cours';
                    statutClass = 'badge-en-cours';
                    break;
                case 'a-lire':
                    statutLabel = 'À lire';
                    statutClass = 'badge-a-lire';
                    break;
                default:
                    statutLabel = livre.statut;
                    statutClass = 'badge-a-lire';
            }
            
            livresHTML += `
                <div class="livre-card">
                    <div class="livre-header">
                        <h3 class="livre-titre">${livre.titre}</h3>
                        <p class="livre-auteur">par ${livre.auteur}</p>
                    </div>
                    <div class="livre-body">
                        <div class="livre-info">
                            <span>Catégorie:</span>
                            <span>${categorieNom}</span>
                        </div>
                        <div class="livre-info">
                            <span>Publication:</span>
                            <span>${new Date(livre.datePublication).toLocaleDateString()}</span>
                        </div>
                        <div class="livre-statut">
                            <span class="livre-badge ${statutClass}">${statutLabel}</span>
                        </div>
                        <div class="livre-actions">
                            <button class="action-modifier" data-id="${livre.id}">
                                <i class="fas fa-edit"></i> Modifier
                            </button>
                            <button class="action-supprimer" data-id="${livre.id}">
                                <i class="fas fa-trash"></i> Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    elements.livresContainer.innerHTML = livresHTML;
    
    // Générer la pagination
    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    if (totalPages <= 1) {
        elements.pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Bouton précédent
    paginationHTML += `
        <button class="page-prev" ${state.currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    // Pages
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button class="page-number ${i === state.currentPage ? 'active' : ''}" data-page="${i}">
                ${i}
            </button>
        `;
    }
    
    // Bouton suivant
    paginationHTML += `
        <button class="page-next" ${state.currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    elements.pagination.innerHTML = paginationHTML;
    
    // Ajouter les écouteurs d'événements pour la pagination
    elements.pagination.querySelectorAll('.page-number').forEach(btn => {
        btn.addEventListener('click', () => {
            state.currentPage = parseInt(btn.dataset.page);
            renderLivres();
        });
    });
    
    const prevBtn = elements.pagination.querySelector('.page-prev');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (state.currentPage > 1) {
                state.currentPage--;
                renderLivres();
            }
        });
    }
    
    const nextBtn = elements.pagination.querySelector('.page-next');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (state.currentPage < totalPages) {
                state.currentPage++;
                renderLivres();
            }
        });
    }
}

function renderCategoriesSelect() {
    // Remplir le sélecteur de catégories pour le filtre
    let optionsHTML = '<option value="">Toutes les catégories</option>';
    state.categories.forEach(categorie => {
        optionsHTML += `<option value="${categorie.id}">${categorie.nom}</option>`;
    });
    elements.filtreCategorie.innerHTML = optionsHTML;
    
    // Remplir le sélecteur de catégories pour le formulaire
    optionsHTML = '';
    state.categories.forEach(categorie => {
        optionsHTML += `<option value="${categorie.id}">${categorie.nom}</option>`;
    });
    elements.categorieSelect.innerHTML = optionsHTML;
}

// Démarrer l'application
document.addEventListener('DOMContentLoaded', initApp);