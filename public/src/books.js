function findAuthorById(authors, id) {
  // return author object matching provided id
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  // return book object matching provided id
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  // return an array with two arrays
  // first array being books out on loan
  // second array being books in stock
  return [
    [
      ...books.filter((book) => !book.borrows[0].returned)
    ],
    [
      ...books.filter((book) => book.borrows[0].returned)
    ]
  ]
}

function getBorrowersForBook({borrows}, accounts) {
  // return array of account objects with accounts matching borrows
  const returnValue = [];
  // loop through borrows array of provided book
  // add account information to each borrow object
  for (const borrow of borrows) {
    const {id, picture, age, name, company, email, registered} = accounts.find((account) => borrow.id === account.id);
    const returned = borrow.returned 
    const newObj = {
      id,
      returned,
      picture,
      age,
      name,
      company,
      email,
      registered
    }
    // limit length to ten accounts
    returnValue.length >= 10 ? returnValue : returnValue.push(newObj);
  }
  return returnValue;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
