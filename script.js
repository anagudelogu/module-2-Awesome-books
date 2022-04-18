const form = document.querySelector('form');
const title = form.elements[0];
const author = form.elements[1];
const button = form.elements[2];
let library = [];
const bookStorage = document.querySelector('.book-storage');
const book = {
  title,
  author,
};

const div = document.createElement('div');
const p = document.createElement('p');
const btn = document.createElement('button');

const takingFromStorage = () => {
  library = JSON.parse(localStorage.getItem('library'));
  if (localStorage.getItem('library') === null) library = [];
};

const setLocalStorage = (book) => {
  takingFromStorage();
  library.push(book);
  localStorage.setItem('library', JSON.stringify(library));
};

takingFromStorage();

const createBook = (title, author) => {
  const bookContainer = div.cloneNode(true);
  const bookTitle = p.cloneNode(true);
  const bookAuthor = p.cloneNode(true);
  const bookButton = btn.cloneNode(true);

  bookStorage.append(bookContainer);
  bookContainer.classList.add('book');
  bookContainer.append(bookTitle, bookAuthor, bookButton);

  bookTitle.innerText = title;
  bookAuthor.innerText = author;
  bookButton.innerText = 'Remove';
  bookButton.classList.add('remove-btn');
};

library.forEach((book) => createBook(book.title, book.author));

const addBook = () => {
  const newBook = Object.create(book);
  newBook.title = title.value;
  newBook.author = author.value;

  setLocalStorage(newBook);
  createBook(library[library.length - 1].title, library[library.length - 1].author);
  window.location.reload();
};

button.addEventListener('click', addBook);

const remove = (title, author) => {
  takingFromStorage();

  for (let i = 0; i < library.length; i += 1) {
    if (library[i].title === title && library[i].author === author) {
      library.splice(library.indexOf(library[i]), 1);
    }
  }
  localStorage.setItem('library', JSON.stringify(library));
  window.location.reload();
};

const removeBtn = document.getElementsByClassName('remove-btn');
Array.from(removeBtn).forEach((button) => button.addEventListener('click', () => {
  const titl = button.parentElement.children[0].innerText;
  const autho = button.parentElement.children[1].innerText;
  remove(titl, autho);
}));
