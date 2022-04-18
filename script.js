const form = document.querySelector('form');
const title = form.elements[0];
const author = form.elements[1];
const button = form.elements[2];
let library = [];
const bookStorage = document.querySelector('.book-storage');
const book = {
    title,
    author,
}
const removeBtn = document.querySelectorAll('.remove-btn')

const div = document.createElement('div');
const p = document.createElement('p');
const btn = document.createElement('button');

const setLocalStorage = (book) => {
    takingFromStorage()
    library.push(book)
    localStorage.setItem('library', JSON.stringify(library));
}


const takingFromStorage = () => {
    library = JSON.parse(localStorage.getItem('library'));
    if(localStorage.getItem('library') === null) 
        library = [];
};

takingFromStorage()

const createBook = (title, author) => {
    let bookContainer = div.cloneNode(true);
    let bookTitle = p.cloneNode(true);
    let bookAuthor = p.cloneNode(true);
    let bookButton = btn.cloneNode(true);

    bookStorage.append(bookContainer);
    bookContainer.classList.add('book');
    bookContainer.append(bookTitle, bookAuthor, bookButton);

    bookTitle.innerText = title;
    bookAuthor.innerText = author;
    bookButton.innerText = 'Remove';
    bookButton.classList.add('remove-btn')
}

library.forEach(book => createBook(book.title, book.author))

const addBook = () => {
    const newBook = Object.create(book);
    newBook.title = title.value;
    newBook.author = author.value;
    
    setLocalStorage(newBook)
    createBook(library[library.length-1].title, library[library.length-1].author);
}

button.addEventListener('click', addBook);