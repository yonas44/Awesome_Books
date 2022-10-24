let books = [];

// Update books object from session storage

let oldBooks = sessionStorage.getItem('book');
if (oldBooks !== null) {
  oldBooks = JSON.parse(oldBooks);
  books = oldBooks;
  console.log(books);
}

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const form = document.querySelector('#form');

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
  });
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

// Function to remove childnodes from the book container

function removeChild() {
  const bookHolder = document.querySelector('.book-holder');
  while (bookHolder.hasChildNodes()) {
    bookHolder.removeChild(bookHolder.firstChild);
  }
}

function bookRemover(event) {
  const filteredBooks = books.filter(function (book) {
    return book.title !== event.path[1].className;
  });
  books = filteredBooks;
  removeChild();
  displayBook();
  Stringifier();
}

// Stringifier function

function Stringifier() {
  const updatedBooks = JSON.stringify(books);
  sessionStorage.setItem('book', updatedBooks);
}

