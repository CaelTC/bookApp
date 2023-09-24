import { Book, NewBook, BookField } from "../models/Books";
import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { serverDecoder } from "../communication/In";

type bookReturns = {
  books: Book[];
  addBook: (book: NewBook) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
  updateBook: (
    bookToUpdate: Book,
  ) => Promise<void>;
};

export function useBooks(): bookReturns {
  const [books, setBooks] = useState<Book[]>([]);
  
  const fetchBooks = useCallback(async () => {
    await Axios.get("/books").then((res) => {
      setBooks(res.data);
    });
  }, []);
  
  const addBook = async (newBook: NewBook) => {
    const configs = { headers: { "Content-Type": "application/json" } };
    Axios.post("/add", newBook, configs)
      .then((res) => serverDecoder(res).then(fetchBooks))
      .catch((error) => console.log(error));
  };
  
  const deleteBook = async (id: number) => {
    Axios.delete(`/delete/${id}`)
      .then((res) => serverDecoder(res).then(fetchBooks))
      .catch((error) => console.log(error));
  };
  
  const updateBook = async (
    book: Book,
  ) => {
    
    const configs = { headers: { "Content-Type": "application/json" } };
    Axios.put(`/update`, book, configs )
      .then((res) => serverDecoder(res).then(fetchBooks))
      .catch((error) => console.log(error));
  };
  
  useEffect(() => {
    fetchBooks();
  }, []);
  
  return {
    books: books,
    addBook: addBook,
    deleteBook: deleteBook,
    updateBook: updateBook,
  };
}
