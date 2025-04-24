export function renderBookList(books, container) {

    fetch('./book-list.html') 
    .then(response => response.text())
    .then(html => {
        container.innerHTML = html; 
        const bookListItems = container.querySelector('#book-list-items');
            if (bookListItems) {
                if (books && books.length > 0) {
                    books.forEach(book => {
                        const listItem = document.createElement('li');
                        listItem.textContent = `${book.titre} - ${book.auteur} (${book.categorie}, statut: ${book.statut})`;
                        bookListItems.appendChild(listItem);
                    });
                } else {
                    const emptyMessage = document.createElement('li');
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