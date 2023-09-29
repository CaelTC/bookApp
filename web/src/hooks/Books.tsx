import { Book, NewBook } from "../models/Books";
import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { bookDecoder, serverDecoder } from "../communication/In";
import { bookEncoder } from "../communication/Out";

type bookReturns = {
  books: Book[];
  addBook: (book: NewBook) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
  updateBook: (bookToUpdate: Book) => Promise<void>;
};

export function useBooks(): bookReturns {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = useCallback(async () => {
    await Axios.get("/books").then((res) => {
      setBooks(res.data.map((json: Book) => bookDecoder(json)));
      console.log(res.data);
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

  const updateBook = async (book: Book) => {
    Axios.request({
      method: "put",
      url: `/update`,
      transformRequest: [
        (data, headers) => {
          data = bookEncoder(book);
          return [JSON.stringify(data)];
        },
      ],
      headers: { "Content-Type": "application/json" },
    })
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
