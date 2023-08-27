const myLibrary = [];

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