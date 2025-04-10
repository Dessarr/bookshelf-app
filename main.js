const saveBooksToLocalStorage = () => {
    localStorage.setItem('books', JSON.stringify(books));
  };
  
  let books = JSON.parse(localStorage.getItem('books')) || [];
  

  const addBook = (book) => {
    books.push(book);
    saveBooksToLocalStorage();
  };
  

  const getBooksByStatus = (status) => {
    return books.filter(book => book.isComplete === status);
  };

  const bookForm = document.getElementById('bookForm');

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = document.getElementById('bookFormTitle').value;
  const author = document.getElementById('bookFormAuthor').value;
  const year = parseInt(document.getElementById('bookFormYear').value);
  const isComplete = document.getElementById('bookFormIsComplete').checked;

  const newBook = {
    id: new Date().getTime(),
    title,
    author,
    year,
    isComplete
  };

  addBook(newBook);
  renderBooks();
});

const renderBooks = () => {
    const incompleteBookList = document.getElementById('incompleteBookList');
    const completeBookList = document.getElementById('completeBookList');
  
    incompleteBookList.innerHTML = '';
    completeBookList.innerHTML = '';
  
    getBooksByStatus(false).forEach((book) => {
      const bookElement = createBookElement(book);
      incompleteBookList.appendChild(bookElement);
    });
  
    getBooksByStatus(true).forEach((book) => {
      const bookElement = createBookElement(book);
      completeBookList.appendChild(bookElement);
    });
  };
  
  const createBookElement = (book) => {
    const bookItem = document.createElement('div');
    bookItem.setAttribute('data-bookid', book.id);
    bookItem.setAttribute('data-testid', 'bookItem');
  
    bookItem.innerHTML = `
      <h3 data-testid="bookItemTitle">${book.title}</h3>
      <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
      <p data-testid="bookItemYear">Tahun: ${book.year}</p>
      <div>
        <button data-testid="bookItemIsCompleteButton">Selesai dibaca</button>
        <button data-testid="bookItemDeleteButton">Hapus Buku</button>
        <button data-testid="bookItemEditButton">Edit Buku</button>
      </div>
    `;
  
    bookItem.querySelector('[data-testid="bookItemIsCompleteButton"]').addEventListener('click', () => {
      toggleBookStatus(book.id);
    });
  
    bookItem.querySelector('[data-testid="bookItemDeleteButton"]').addEventListener('click', () => {
      deleteBook(book.id);
    });
  
    return bookItem;
  };
  
  const toggleBookStatus = (id) => {
    const book = books.find(b => b.id === id);
    if (book) {
      book.isComplete = !book.isComplete;
      saveBooksToLocalStorage();
      renderBooks();
    }
  };
  
  const deleteBook = (id) => {
    books = books.filter(book => book.id !== id);
    saveBooksToLocalStorage();
    renderBooks();
  };
  
  renderBooks();

  const searchForm = document.getElementById('searchBook');
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchQuery = document.getElementById('searchBookTitle').value.toLowerCase();
  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchQuery));
  
  renderFilteredBooks(filteredBooks);
});

const renderFilteredBooks = (filteredBooks) => {
  const incompleteBookList = document.getElementById('incompleteBookList');
  const completeBookList = document.getElementById('completeBookList');

  incompleteBookList.innerHTML = '';
  completeBookList.innerHTML = '';

  filteredBooks.forEach((book) => {
    const bookElement = createBookElement(book);
    if (book.isComplete) {
      completeBookList.appendChild(bookElement);
    } else {
      incompleteBookList.appendChild(bookElement);
    }
  });
};

