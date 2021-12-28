function findAccountById(accounts, id) {
  // return a single account object matching id that is provided
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  // return accounts array sorted a-z by last name
  // set to lower case for accuracy
  return accounts.sort((acctOne, acctTwo) => (acctOne.name.last.toLowerCase() < acctTwo.name.last.toLowerCase() ? -1 : 1));
}

function getTotalNumberOfBorrows(account, books) {
  // return a number representing the amount of times provided
  // account has checked out books
  return books
      // reduce books array to only array of borrow objects from each book
      .reduce((allBorrows, book) => {
          if (!allBorrows) { allBorrows = [ ...book.borrows, ] }
          else {allBorrows = [ ...allBorrows, ...book.borrows, ] };
          return allBorrows;
          }, [])
      // filter the new reduced array for borrow.id macthing account.id
      // filter by id per borrow
      .filter(({id}) => id === account.id)
      // return length of filtered array to get the number
      .length;
}

function getBooksPossessedByAccount(account, books, authors) {
  // filter books to only those with 0 index of borrows array of each book
  // that matches provided account id and is not returned
  const borrowedBooks = books.filter( ( book => {
    if(!book.borrows[0].returned && book.borrows[0].id === account.id) {
      return book;
    }
  }));
  // loop through each book of our filtered array to recreate the book object
  // to include the author object
  
  for(let i = 0; i < borrowedBooks.length; i++) {
    // destructuring each book object
    const {id, title, authorId, borrows} = borrowedBooks[i];
    borrowedBooks[i] = {
      id,
      title,
      authorId,
      author: authors.find(author => author.id === borrowedBooks[i].authorId),
      borrows,
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
