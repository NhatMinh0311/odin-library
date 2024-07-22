const myLibrary = [];

function Book (title, author, numOfPages, readStatus) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.read = readStatus;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
}


function toggleRead(index) {
    myLibrary[index].toggleRead();
    displayBooks();
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function addBookToLibrary (data) {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const numOfPages = document.querySelector("#numpages").value;
    const read = document.querySelector("#readstatus").checked;
    const book = new Book(title, author, numOfPages, read);
    myLibrary.push(book);
}

function displayBooks() {
    const table = document.querySelector("table");
    table.innerHTML = `   
    <thead>
        <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Number of pages</th>
            <th scope="col">Read satus</th>
            <th></th>
        </tr>
    </thead>
    `; 
    const body = document.createElement("tbody");
    for (let i = 0; i < myLibrary.length; i++){
        const book = myLibrary[i];
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.numOfPages}</td>
        <td>${book.read ? "Read" : "Not read yet"}</td>
        <td>
            <button onclick="toggleRead(${i})">Toggle Read</button>
            <button onclick="removeBook(${i})">Remove</button>
        </td>
        `
        body.appendChild(row);
    }
    table.append(body);
}

const dialog = document.querySelector("dialog");
const newBook = document.querySelector("dialog + button");
const cancel = document.querySelector("#cancel");

newBook.addEventListener("click", () => {
    dialog.showModal();
});

cancel.addEventListener("click", () => {
    dialog.close();
});

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    addBookToLibrary();
    dialog.close();
    displayBooks();
});