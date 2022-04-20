/* eslint-disable max-classes-per-file */
const bookStorage = document.querySelector('.book-list__book-storage');
const form = document.querySelector('form');
const title = form.elements[0];
const author = form.elements[1];
const addButton = form.elements[2];
const div = document.createElement('div');
const p = document.createElement('p');
const btn = document.createElement('button');

class Book {
  title;

  author;

  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Storage {
  static takingFromStorage() {
    let library;
    if (!localStorage.getItem('library')) {
      library = [];
    } else {
      library = JSON.parse(localStorage.getItem('library'));
    }
    return library;
  }

  static setLocalStorage(book) {
    const library = Storage.takingFromStorage();
    library.push(book);
    localStorage.setItem('library', JSON.stringify(library));
  }

  static removeFromLocalStorage(text) {
    const library = Storage.takingFromStorage();
    library.forEach((book) => {
      if (`"${book.title}" by ${book.author}`.trim() === text.trim()) {
        library.splice(library.indexOf(book), 1);
      }
    });
    localStorage.setItem('library', JSON.stringify(library));
  }
}

class Library {
  static displayLibrary() {
    const library = Storage.takingFromStorage();
    library.forEach((book) => Library.createBook(book));
  }

  static createBook(book) {
    const bookContainer = div.cloneNode(true);
    const bookText = p.cloneNode(true);
    const bookButton = btn.cloneNode(true);

    bookStorage.append(bookContainer);
    bookContainer.classList.add('book');
    bookContainer.append(bookText, bookButton);

    bookText.innerText = `"${book.title}" by ${book.author}`;
    bookButton.innerText = 'Remove';
    bookButton.classList.add('remove-btn');
  }

  static removeBook(element) {
    if (element.classList.contains('remove-btn')) {
      element.parentNode.remove();
    }
  }

  static clearInputs() {
    title.value = '';
    author.value = '';
  }
}

Library.displayLibrary();

addButton.addEventListener('click', () => {
  const book = new Book(title.value, author.value);
  Library.createBook(book);
  Storage.setLocalStorage(book);
  Library.clearInputs();
});

bookStorage.addEventListener('click', (e) => {
  const text = e.target.parentNode.children[0].textContent;
  Library.removeBook(e.target);
  Storage.removeFromLocalStorage(text);
});


// Section pages

const navLinks = document.querySelector('.nav__links');
const list = document.querySelector('.book-list');
const add = document.querySelector('.add-book');
const contact = document.querySelector('.contact');


navLinks.addEventListener('click', (e) =>{
  e.preventDefault();
  if (e.target.classList.contains('List')){
    add.classList.remove('active');
    contact.classList.remove('active');
    list.classList.add('active');

  }else if(e.target.classList.contains('New')){
    contact.classList.remove('active');
    list.classList.remove('active');
    add.classList.add('active');
  }else{
    list.classList.remove('active');
    add.classList.remove('active');
    contact.classList.add('active');
  }
});

// Date

const date = document.querySelector('.date');

const clock = () => {
  const theDate = new Date();
  date.innerHTML = `${theDate.toDateString()}, ${theDate.getHours()}:${theDate.getMinutes()}:${theDate.getSeconds()}`;
}

setInterval(clock, 1000)