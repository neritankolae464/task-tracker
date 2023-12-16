// filename: complexApplication.js

/*
  Complex Application

  This code represents a complex and sophisticated application.
  It demonstrates various programming techniques and concepts,
  including object-oriented programming, async/await, error handling,
  and more.

  This application manages a library system, allowing users to search,
  borrow, and return books. It also provides an admin interface for
  managing the library catalog.

  Please note that this is a sample code for a complex application,
  and it may not have full functionality or completeness.

  Author: Jane Doe
  Version: 1.0
*/

// Utility function to generate random book IDs
function generateBookId() {
  const randomNumber = Math.floor(Math.random() * 1000);
  return `BOOK-${randomNumber}`;
}

// Class representing a book
class Book {
  constructor(title, author, genre) {
    this.id = generateBookId();
    this.title = title;
    this.author = author;
    this.genre = genre;
  }
}

// Class representing a library system
class Library {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.catalog = [];
    this.borrowedBooks = new Map();
  }

  // Add a book to the library catalog
  addBook(book) {
    this.catalog.push(book);
    console.log(`Added book '${book.title}' to the catalog.`);
  }

  // Remove a book from the library catalog
  removeBook(bookId) {
    const index = this.catalog.findIndex((book) => book.id === bookId);
    if (index !== -1) {
      const removedBook = this.catalog[index];
      this.catalog.splice(index, 1);
      console.log(`Removed book '${removedBook.title}' from the catalog.`);
    }
  }

  // Search for books by title or author
  searchBooks(query) {
    const searchResults = this.catalog.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );
    console.log(`Search results for '${query}':`, searchResults);
  }

  // Borrow a book from the library
  async borrowBook(bookId, userId) {
    try {
      if (this.borrowedBooks.has(bookId)) {
        throw new Error(`Book '${bookId}' is already borrowed.`);
      }

      // Simulate an asynchronous operation (e.g., API request or database query)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const borrowedBook = this.catalog.find((book) => book.id === bookId);
      if (borrowedBook) {
        this.borrowedBooks.set(bookId, userId);
        console.log(`User '${userId}' borrowed book '${borrowedBook.title}'.`);
      } else {
        throw new Error(`Book '${bookId}' not found.`);
      }
    } catch (error) {
      console.error('Error while borrowing book:', error.message);
    }
  }

  // Return a borrowed book
  returnBook(bookId, userId) {
    if (this.borrowedBooks.get(bookId) === userId) {
      this.borrowedBooks.delete(bookId);
      console.log(`User '${userId}' returned book '${bookId}'.`);
    } else {
      console.error(`Book '${bookId}' was not borrowed by user '${userId}'.`);
    }
  }
}

// Create a library instance
const library = new Library('My Library', 'New York');

// Add sample books to the catalog
const book1 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 'Classic');
const book2 = new Book('To Kill a Mockingbird', 'Harper Lee', 'Classic');
const book3 = new Book('1984', 'George Orwell', 'Dystopian');
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

// Search for books
library.searchBooks('great');
library.searchBooks('scott');
library.searchBooks('dystopian');

// Borrow books
library.borrowBook('BOOK-001', 'user1');
library.borrowBook('BOOK-002', 'user2');
library.borrowBook('BOOK-001', 'user3');

// Return books
library.returnBook('BOOK-002', 'user2');
library.returnBook('BOOK-003', 'user1');