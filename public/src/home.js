function getTotalBooksCount(books) {
  // return total number of books
  return books.length;
}

function getTotalAccountsCount(accounts) {
  // return total number of accounts
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  // return array of books currently checked out
  return books.filter((book) => !book.borrows[0].returned).length;
}

function _topFive(sortAndSliceMe) {
  // helper function
  // return a descending sorted array
  // limited to length of five
  return sortAndSliceMe
    .sort((partOne, partTwo) => partOne.count > partTwo.count ? -1 : 1)
    .slice(0,5)
}

function getMostCommonGenres(books) {
  // return a new array objects
  // each object including a genre name and how many books of that genre
  // library has
  // maps books array to an array of only genre names
  const genreNames = books.map(book=> book.genre)
  let returnValue = []
  // loop through only genre names array and for each one check if it
  // exists in the accumulator array
  for(const name of genreNames) {
    // .findIndex returns the index of chosen value
    // if result is -1, chosen value is not present
   let existing = returnValue.findIndex(value=> value.name === name);
   // if genre already exists in our accumulator increase the count
    if(existing !== -1){
     returnValue[existing].count++
   } else {
     // if it does not exist, we push it
     returnValue.push({
      name: name,
      count: 1
    })
    }
  }
  // use helper function to sort in descending and return top five
  return _topFive(returnValue);
}

function getMostPopularBooks(books) {
  // return array of top five most checked out books
  // map to new array with book title and count/borrows.length
  // send mapped books to topfive function for the ol' sort and slice
  return _topFive(books.map((book) => ({name: book.title, count: book.borrows.length})));
}

function getMostPopularAuthors(books, authors) {
  let returnValue = [];
  // for each author create a new object with name and count
  authors.forEach((author) => {
    let person = {
      name: `${author.name.first} ${author.name.last}`,
      count: 0
    };
    // determine actual count for each author from each matching
    // book.borrows
    books.forEach((book) => {
      if (book.authorId === author.id) {
        person.count += book.borrows.length;
      }
    });
    // push each person object to return array
    returnValue.push(person);
  });
  // sort and slice 
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
