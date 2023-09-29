import { Book, BookState } from "../models/Books";

export function bookEncoder(book: Book) {
  return {
    id: book.id,
    isInTheHouse: bookStateEncoder(book.bookState),
    title: book.title,
    year: book.year,
    owner: book.owner,
    lender: book.lender,
  };
}

function bookStateEncoder(state: BookState) {
  const bookState = (state: BookState) => {
    switch (state) {
      case BookState.AtTheHouse:
        return true;
      case BookState.Lent:
        return false;
      default:
        return true;
    }
  };
  return bookState(state);
}
