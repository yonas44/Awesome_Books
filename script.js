/* eslint-disable no-use-before-define */

let books = [];

// Update books object from local storage

let oldBooks = localStorage.getItem('book');
if (oldBooks !== null) {
  oldBooks = JSON.parse(oldBooks);
  books = oldBooks;
}

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const form = document.querySelector('#form');

// Function to remove childnodes from the book container

function removeChild() {
  const bookHolder = document.querySelector('.book-holder');
  while (bookHolder.hasChildNodes()) {
    bookHolder.removeChild(bookHolder.firstChild);
  }
}

// Function to dynamically render the books

function displayBook() {
  const bookHolder = document.querySelector('.book-holder');
  books.map((book) => {
    const singleBook = document.createElement('div');
    singleBook.className = book.title;
    const title = document.createElement('p');
    title.innerHTML = book.title;
    const author = document.createElement('p');
    author.innerHTML = book.author;
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.addEventListener('click', bookRemover);
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
  const updatedBooks = JSON.stringify(books);
  localStorage.setItem('book', updatedBooks);
}

// Function to remove book

function bookRemover(event) {
  const filteredBooks = books.filter((book) => book.title !== event.path[1].className);
  books = filteredBooks;
  removeChild();
  displayBook();
  Stringifier();
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
