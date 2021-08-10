export const groupBy = (array, key) => {
    return array.reduce((book, currentValue) => {
      (book[currentValue[key]] = book[currentValue[key]] || []).push(currentValue);
      return book;
    }, {})
  }