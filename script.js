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
