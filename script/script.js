const bookGrid = document.querySelector('.book-grid');

const addBookBtn = document.querySelector('.add-book');
const newBookForm = document.querySelector('dialog');
const newBookFormCancel = document.querySelector('button[value="cancel"]');
const newBookFormSave = document.querySelector('button[value="send"]');
const haveRead = document.querySelector('#have-read');
const currPage = document.querySelector('#current-page');

const contentWrapper = document.querySelector('.wrapper');

const myLibrary = [];

haveRead.addEventListener('change', (event) => disableCurrentPageIfRead(event.target.checked));

addBookBtn.addEventListener('click', showNewBookForm);
newBookFormCancel.addEventListener('click', (event) => closeNewBookForm(event));
newBookForm.addEventListener('submit', getBookFromForm);

const disableCurrentPageIfRead = (isChecked) => (isChecked) ? currPage.disabled = true : currPage.disabled = false;

function showNewBookForm() {
    newBookForm.showModal();
    contentWrapper.classList.toggle('blurred');
}

function closeNewBookForm(event) {
    event.preventDefault();
    contentWrapper.classList.toggle('blurred');
    newBookForm.close();
}

function getBookFromForm() {
    contentWrapper.classList.toggle('blurred');

    const inputs = document.querySelectorAll('.form-row > input');

    const bookPlaceHolder = [];

    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            bookPlaceHolder.push(input.checked);
        } else {
            bookPlaceHolder.push(input.value);
        } 
    });

    addBookToLibrary(bookPlaceHolder);
    clearBookForm();
}

function addBookToLibrary(bookArr) {
    myLibrary.push(new Book(bookArr[0], bookArr[1], bookArr[2], bookArr[3], bookArr[4], bookArr[5]));
    updateGrid();
}

function updateGrid() {
    bookGrid.innerHTML = ''; //Clear Grid from previously created DOM elements
    myLibrary.forEach((book) => createBookDOM(book));

    const cardBtns = document.querySelectorAll('.optns button');

    cardBtns.forEach(cardBtn => {
        cardBtn.addEventListener('click', (event) => cardBtnsControl(event.target.parentElement.parentElement.parentElement.id, event.target.className));
    });
}

function cardBtnsControl(id, action) {
    if (action === 'add-page') myLibrary[id].addCurrentPage();
    if (action === 'remove-page') myLibrary[id].subCurrentPage();
    if (action === 'del') myLibrary[id].deleteBook(id);
    if (action === 'read') myLibrary[id].toggleRead();
    updateGrid();
}

function clearBookForm() {
    const inputs = document.querySelectorAll('.form-row > input');

    inputs.forEach(input => {
        if (input.type === 'checkbox') input.checked = false;
        input.value = null;
        input.disabled = false;
    });
}

class Book {

    constructor(title, author, maxPage, isRead, currentPage, img) {
        this.id = myLibrary.length;
        this.title = title;
        this.author = author;
        this.currentPage = currentPage;
        if (this.currentPage === '') this.currentPage = 0;
        this.maxPage = +maxPage;
        this.isRead = isRead;
        this.img = img;
    }

    addCurrentPage() {
        if (this.currentPage === this.maxPage) this.currentPage = 0;
        this.currentPage++;
    }

    subCurrentPage() {
        if (this.currentPage === 0) this.currentPage = this.maxPage;
        this.currentPage--;
    }

    toggleRead() {
        return (this.isRead) ? this.isRead = false : this.isRead = true;
    }

    deleteBook(id) {
        delete myLibrary[id];
    }
    
}

function createBookDOM(book){

    //Creating elements, setting classes/ID/content & appending to father elements START

    //Grandpa START
    let bookCard = document.createElement('div');
    bookCard.setAttribute("id", book.id);
    bookCard.classList.add('book-card');

    bookGrid.appendChild(bookCard);
    //Grandpa END

    //Fathers START
    let bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');
    let optns = document.createElement('div');
    optns.classList.add('optns');

    if (book.img) {
        bookCard.setAttribute('style', `background-image: url("${book.img}"); background-size: 100% 100%;`);
        bookInfo.setAttribute('style', 'background-color: rgba(255,255,255,0.8); border-radius: 5px; padding: 5px;');
    }

    bookCard.appendChild(bookInfo);
    bookCard.appendChild(optns);
    //Fathers END

    //bookInfo Children START
    let title = document.createElement('h3');
    title.classList.add('title');
    title.innerText = book.title;

    let author = document.createElement('p');
    author.classList.add('author');
    author.innerText = `By ${book.author}`;

    let pages = document.createElement('p');
    pages.classList.add('pages');
    if ((book.currentPage === book.maxPage || book.isRead === true)) { 
        pages.innerText = `Finished book!`;
    } else {
        pages.innerText = `Currently on page ${book.currentPage} of ${book.maxPage}.`;
    }

    bookInfo.appendChild(title);
    bookInfo.appendChild(author);
    bookInfo.appendChild(pages);
    //bookInfo Children END

    //optns Children START
    let hr = document.createElement('hr');
    optns.appendChild(hr);

    let optnRows = [];
    for (let i = 1; i < 3; i++) {
        optnRows[i] = document.createElement('div');
        optnRows[i].classList.add('optns-row');

        optns.appendChild(optnRows[i]);
    }
    //optns Children END

    //optnsRows Children START
    let btns = [];

    for (let i = 1; i < 6; i++) {
        btns[i] = document.createElement('button');
        btns[i].setAttribute('type', 'button');

        switch(i) {
            case 1:
                btns[i].classList.add('add-page');
                btns[i].innerText = 'Current page +';
                optnRows[1].appendChild(btns[i]);
                break;
            case 2:
                btns[i].classList.add('remove-page');
                btns[i].innerText = 'Current page -';
                optnRows[1].appendChild(btns[i]);
                break;
            case 3:
                btns[i].classList.add('read');
                btns[i].innerText = 'Toggle read';
                optnRows[2].appendChild(btns[i]);
                break;
            case 4:
                btns[i].classList.add('del');
                btns[i].innerText = 'Delete book';
                optnRows[2].appendChild(btns[i]);
                break;
        }
    }
    //optnsRows Children END

    //Creating elements, setting classes/ID/content & appending to father elements END
}


