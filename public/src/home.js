

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter( book => !book.borrows[0].returned).length;
}

function _topFive(sortAndSliceMe) {
  return sortAndSliceMe
    .sort( ( partOne, partTwo ) => partOne.count > partTwo.count ? -1 : 1)
    .slice(0,5);
}

function getMostCommonGenres(books) {
  const genreNames = books.map( book => book.genre );
  let returnValue = [];
  for ( const name of genreNames ) {
    let existing = returnValue.findIndex(value=> value.name === name);
    existing !== -1
    ? returnValue[existing].count++
    : returnValue.push( { name: name, count: 1 } );
  };
  return _topFive(returnValue);
}

function getMostPopularBooks(books) {
  return _topFive( books.map( book => ( { name: book.title, count: book.borrows.length } ) ) );
}

function getMostPopularAuthors(books, authors) {
  let returnValue = [];
  authors.forEach( author => {
    let person = { name: `${author.name.first} ${author.name.last}`, count: 0 };
    books.forEach( book => { if ( book.authorId === author.id ) person.count += book.borrows.length; } );
    returnValue.push(person);
  } );
  return _topFive(returnValue);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
