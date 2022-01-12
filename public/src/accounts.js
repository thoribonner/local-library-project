

function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((acctOne, acctTwo) => (acctOne.name.last.toLowerCase() < acctTwo.name.last.toLowerCase() ? -1 : 1));
}

function getTotalNumberOfBorrows(account, books) {
  return books
      .reduce((allBorrows, book) => {
          !allBorrows ? allBorrows = [ ...book.borrows, ] : allBorrows = [ ...allBorrows, ...book.borrows, ];
          return allBorrows;
          }, [])
      .filter(({id}) => id === account.id)
      .length;
}

function getBooksPossessedByAccount(account, books, authors) {
  const borrowedBooks = books.filter( ( book => {
    if (!book.borrows[0].returned && book.borrows[0].id === account.id) return book;
  }));
  for(let i = 0; i < borrowedBooks.length; i++) {
    const {id, title, authorId, borrows} = borrowedBooks[i];
    borrowedBooks[i] = {
      id, title, authorId, author: authors.find(author => author.id === borrowedBooks[i].authorId), borrows,
    };
  }
  return borrowedBooks;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
