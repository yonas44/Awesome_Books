/* eslint-disable no-use-before-define */

class Store {
  books = [];

  addBook(book) {
    this.books.push(book);
    displayBook();
    Stringifier();
  }

  bookRemover(index) {
    this.books.splice(index, 1);
    displayBook();
    Stringifier();
  }
}

const store = new Store();

// Update books object from local storage

let oldBooks = localStorage.getItem('book');
if (oldBooks !== null) {
  oldBooks = JSON.parse(oldBooks);
  store.books = oldBooks;
}

// Function to dynamically render the books

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const form = document.querySelector('#form');

function displayBook() {
  const bookHolder = document.querySelector('.book-holder');
  books.map((book, index) => {
    const singleBook = document.createElement('div');
    singleBook.className = book.title;
    const title = document.createElement('p');
    title.innerHTML = book.title;
    const author = document.createElement('p');
    author.innerHTML = book.author;
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.addEventListener('click', () => {
      bookRemover(index);
    });
    const line = document.createElement('hr');
    removeBtn.innerText = 'Remove';
    singleBook.append(title, author, removeBtn, line);
    bookHolder.appendChild(singleBook);
    return '';
  });
}

displayBook();

// Stringifier function

function Stringifier() {
  const updatedBooks = JSON.stringify(store.books);
  localStorage.setItem('book', updatedBooks);
}

// Event listener for the book adder form

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const book = {};
  book.title = title.value;
  book.author = author.value;
  books.push(book);
  title.value = '';
  author.value = '';
  removeChild();
  displayBook();
  Stringifier();
});
