class Library {
    library = [];

    addBook() {
        const title = document.querySelector("#title").value;
        const author = document.querySelector("#author").value;
        const pages = document.querySelector("#numpages").value;
        const read = document.querySelector("#readstatus").checked;
        const book = new Book(title, author, pages, read);
        this.library.push(book);
    }

    toggleRead(index) {
        this.library[index].toggleRead();
        this.displayBooks();
    }
    
    removeBook(index) {
        this.library.splice(index, 1);
        this.displayBooks();
    }

    displayBooks(){
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
        for (let i = 0; i < this.library.length; i++){
            const book = this.library[i];
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.read ? "Read" : "Not read yet"}</td>
            <td>
                <button onclick="myLibrary.toggleRead(${i})">Toggle Read</button>
                <button onclick="myLibrary.removeBook(${i})">Remove</button>
            </td>
            `
            body.appendChild(row);
        }
        table.append(body);
    }
}


class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    toggleRead() {
        this.read = !this.read;
    }
}

const myLibrary = new Library();

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
    myLibrary.addBook();
    dialog.close();
    myLibrary.displayBooks()
});