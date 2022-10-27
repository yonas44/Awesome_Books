/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */

class Store {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    Store.books.push(this);
  }

  static bookRemover(index) {
    Store.books.splice(index, 1);
  }

  static books = [];
}

// Update books object from local storage

let oldBooks = localStorage.getItem('book');
if (oldBooks !== null) {
  oldBooks = JSON.parse(oldBooks);
  Store.books = oldBooks;
}
// Function to dynamically render the books

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const form = document.querySelector('#form');

function displayBook() {
  const bookHolder = document.querySelector('.book-holder');

  while (bookHolder.hasChildNodes()) {
    bookHolder.removeChild(bookHolder.firstChild);
  }
  if (Store.books.length === 0) {
    const message = document.createElement('tr');
    message.className = 'fs-2 text-center fw-semibold';
    message.innerText =
      'Your collection seems to be empty, please add books using the add-new link.';
    bookHolder.appendChild(message);
  } else {
    Store.books.map((book, index) => {
      const singleBook = document.createElement('tr');
      const title = document.createElement('td');
      title.innerText = `"${book.title}" by ${book.author}`;
      const button = document.createElement('td');
      const removeBtn = document.createElement('button');
      removeBtn.addEventListener('click', () => {
        Store.bookRemover(index);
        displayBook();
        Stringifier();
      });
      removeBtn.innerText = 'Remove';
      button.appendChild(removeBtn);
      singleBook.append(title, button);
      bookHolder.appendChild(singleBook);
      return bookHolder;
    });
  }
}
displayBook();

// Stringifier function

function Stringifier() {
  const updatedBooks = JSON.stringify(Store.books);
  localStorage.setItem('book', updatedBooks);
}

// Event listener for the book adder form

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const book = new Store(title.value, author.value);
  displayBook();
  Stringifier();
  title.value = '';
  author.value = '';
});

// Add navigation
const time = document.querySelector('#time');
time.innerText = new Date();
const links = document.querySelectorAll('.links');
const sections = document.querySelectorAll('.section');
links.forEach((link) => {
  link.addEventListener('click', (event) => {
    const val = event.target.id;
    sections.forEach((section) => {
      if (section.classList.contains(val)) section.classList.add('on');
      else section.classList.remove('on');
    });
  });
});
