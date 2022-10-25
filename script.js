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
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
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
  while (bookHolder.hasChildNodes()) {
    bookHolder.removeChild(bookHolder.firstChild);
  }
  store.books.map((book, index) => {
    const singleBook = document.createElement('tr');
    const title = document.createElement('td');
    title.innerText = `"${book.title}" by ${book.author}`;
    const button = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.addEventListener('click', () => {
      store.bookRemover(index);
    });
    removeBtn.innerText = 'Remove';
    button.appendChild(removeBtn);
    singleBook.append(title, button);
    bookHolder.appendChild(singleBook);
    return bookHolder;
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
  const book = new Book(title.value, author.value);
  store.addBook(book);
  title.value = '';
  author.value = '';
});