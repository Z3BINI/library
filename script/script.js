const bookGrid = document.querySelector('.book-grid');
const myLibrary = [
    {
        id: 1,
        title: 'Ulisses',
        author: 'John Doe',
        currentPage: 102,
        maxPage: 233,
        isRead: false,
        img: ''
    }
];

function Book(title, author, currentPage, maxPage, isRead, img) {
    this.id = myLibrary.length;
    this.title = title;
    this.author = author;
    this.currentPage = currentPage;
    this.maxPage = maxPage;
    this.isRead = isRead;
    this.img = img ?? '';
}



function addBookToLibrary() {

}

myLibrary.forEach(function(book){

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
    pages.innerText = `Currently on page ${book.currentPage} of ${book.maxPage}.`;

    bookInfo.appendChild(title);
    bookInfo.appendChild(author);
    bookInfo.appendChild(pages);
    //bookInfo Children END

    //optns Children START
    let hr = document.createElement('hr');
    let optnsRow1 = document.createElement('div');
    optnsRow1.classList.add('optns-row');
    let optnsRow2 = document.createElement('div');
    optnsRow2.classList.add('optns-row');
    let optnsRow3 = document.createElement('div');
    optnsRow3.classList.add('optns-row');

    optns.appendChild(hr);
    optns.appendChild(optnsRow1);
    optns.appendChild(optnsRow2);
    optns.appendChild(optnsRow3);
    //optns Children END

    //optnsRows Children START
        let btn1 = document.createElement('button');
        let btn2 = document.createElement('button');
        let btn3 = document.createElement('button');
        let btn4 = document.createElement('button');
        let btn5 = document.createElement('button');
        btn1.setAttribute('type', 'button');
        btn2.setAttribute('type', 'button');
        btn3.setAttribute('type', 'button');
        btn4.setAttribute('type', 'button');
        btn5.setAttribute('type', 'button');
        btn1.classList.add('add-page');
        btn2.classList.add('remove-page');
        btn3.classList.add('read');
        btn4.classList.add('del');
        btn5.classList.add('edit');
        btn1.innerText = 'Current page +';
        btn2.innerText = 'Current page -';
        btn3.innerText = 'Toggle read';
        btn4.innerText = 'Delete book';
        btn5.innerText = 'Edit';

        optnsRow1.appendChild(btn1);
        optnsRow1.appendChild(btn2);

        optnsRow2.appendChild(btn3);
        optnsRow2.appendChild(btn4);

        optnsRow3.appendChild(btn5);
    //optnsRows Children END

    //Creating elements, setting classes/ID/content & appending to father elements END

    console.log(book);
});