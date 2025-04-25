export function renderBookList(books, container) {
    // Récupérer le template HTML
    fetch('./components/book-list/book-list.html') 
    .then(response => response.text())
    .then(html => {
        container.innerHTML = html; 
        const bookListItems = container.querySelector('#book-list-items');
        
        if (bookListItems) {
            if (books && books.length > 0) {
                // Créer un élément pour chaque livre
                books.forEach(book => {
                    const listItem = document.createElement('li');
                    
                    // Ajouter une classe pour le style
                    listItem.classList.add('book-item');
                    
                    // Créer le contenu du livre avec plus de détails
                    listItem.innerHTML = `
                        <div class="book-item-content">
                            <h3>${book.titre}</h3>
                            <p class="author">Par ${book.auteur}</p>
                            <div class="book-details">
                                <span class="category">Catégorie: ${book.categorie || 'Non catégorisé'}</span>
                                <span class="status status-${book.statut}">${formatStatus(book.statut)}</span>
                            </div>
                            <div class="book-actions">
                                <button class="btn-edit" data-id="${book.id}">Modifier</button>
                                <button class="btn-delete" data-id="${book.id}">Supprimer</button>
                            </div>
                        </div>
                    `;
                    
                    // Ajouter le livre à la liste
                    bookListItems.appendChild(listItem);
                });
            } else {
                // Message si aucun livre
                const emptyMessage = document.createElement('li');
                emptyMessage.classList.add('empty-list');
                emptyMessage.textContent = 'Aucun livre dans la liste pour le moment.';
                bookListItems.appendChild(emptyMessage);
            }
        } else {
            console.error("L'élément avec l'ID 'book-list-items' n'a pas été trouvé dans le template.");
        }
    })
    .catch(error => {
        console.error('Erreur lors de la récupération du template HTML:', error);
    });
}

// Fonction pour formater le statut du livre
function formatStatus(status) {
    switch(status) {
        case 'lu':
            return 'Lu';
        case 'en-cours':
            return 'En cours';
        case 'a-lire':
            return 'À lire';
        default:
            return status;
    }
}