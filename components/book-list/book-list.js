export function renderBookList(books, container) {
    if (!books || !Array.isArray(books)) {
        console.error('Invalid books data');
        return;
    }

    let html = `
        <div class="book-list-header">
            <h2>Ma Bibliothèque Technique</h2>
            <div class="book-count">${books.length} livre(s)</div>
        </div>
        <ul id="book-list-items" class="book-grid">
    `;

    if (books.length === 0) {
        html += `
            <li class="no-books">
                <i class="fas fa-book-open"></i>
                <p>Aucun livre dans votre bibliothèque</p>
                <button id="btn-add-first-book" class="btn-primary">
                    Ajouter votre premier livre
                </button>
            </li>
        `;
    } else {
        books.forEach(book => {
            const statusClass = getStatusClass(book.statut);
            const statusText = formatStatus(book.statut);
            const publicationDate = book.datePublication ? 
                new Date(book.datePublication).toLocaleDateString('fr-FR') : 'Non spécifiée';

            html += `
                <li class="book-card" data-id="${book.id}">
                    <div class="book-cover">
                        <div class="book-cover-placeholder">
                            <i class="fas fa-book"></i>
                        </div>
                        <div class="book-status ${statusClass}">${statusText}</div>
                    </div>
                    <div class="book-details">
                        <h3 class="book-title">${book.titre}</h3>
                        <p class="book-author">${book.auteur || 'Auteur inconnu'}</p>
                        <div class="book-meta">
                            <span class="publication-date">
                                <i class="fas fa-calendar-alt"></i> ${publicationDate}
                            </span>
                            <span class="book-category">
                                <i class="fas fa-tag"></i> ${book.categorie || 'Non catégorisé'}
                            </span>
                        </div>
                    </div>
                    <div class="book-actions">
                        <button class="btn-action btn-edit" data-id="${book.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-action btn-delete" data-id="${book.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </li>
            `;
        });
    }

    html += `</ul>`;
    container.innerHTML = html;

    if (books.length === 0) {
        document.getElementById('btn-add-first-book')?.addEventListener('click', () => {
            document.getElementById('btn-ajouter').click();
        });
    }

    container.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const bookId = btn.dataset.id;
            console.log('Edit book:', bookId);
        });
    });

    container.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const bookId = btn.dataset.id;
            console.log('Delete book:', bookId);
        });
    });

    container.querySelectorAll('.book-card').forEach(card => {
        card.addEventListener('click', () => {
            const bookId = card.dataset.id;
            console.log('View book details:', bookId);
        });
    });
}

function getStatusClass(status) {
    switch(status) {
        case 'lu': return 'status-read';
        case 'en-cours': return 'status-reading';
        case 'a-lire': return 'status-toread';
        default: return 'status-unknown';
    }
}

function formatStatus(status) {
    switch(status) {
        case 'lu': return 'Lu';
        case 'en-cours': return 'En cours';
        case 'a-lire': return 'À lire';
        default: return status;
    }
}