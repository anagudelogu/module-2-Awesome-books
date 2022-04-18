const form = document.querySelector('form');
const title = form.elements[0];
const author = form.elements[1];
const button = form.elements[2];
const library = [];
const bookStorage = document.querySelector('.book-storage');
localStorage.setItem('library', JSON.stringify(library));
const localLibrary = JSON.parse(localStorage.getItem('library'));
console.log(JSON.parse(localStorage.getItem('library')));
const book = {
    title,
    author,
}

const div = document.createElement('div');
const p = document.createElement('p');
const btn = document.createElement('button');


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
}

const addBook = () => {
    const newBook = Object.create(book);
    newBook.title = title.value;
    newBook.author = author.value;
    
    library.push(newBook);
    createBook(library[library.length-1].title, library[library.length-1].author);
    localStorage.setItem('library', JSON.stringify(library));
    console.log(JSON.parse(localStorage.getItem('library')));
    console.log(typeof(JSON.parse(localStorage.getItem('library'))));
}

button.addEventListener('click', addBook);



