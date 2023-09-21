import { Book, NewBook, BookField } from "../models/Books";
import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { serverDecoder } from "../communication/In";

type bookReturns = {
  books: Book[];
  addBook: (book: NewBook) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
  updateBook: (
    fieldToModify: BookField,
    id: number,
    data: string | number | boolean
  ) => Promise<void>;
};

export function useBooks(): bookReturns {
  const [books, setBooks] = useState<Book[]>([]);
  const fetchBook = async (id:number) => {
    Axios.get(`/book/${id}`).then((res) => {updateDomain(res.data)})
  }
  const updateDomain = (updatedBook:Book) =>
  {
    setBooks( prevBooks => {
        if (prevBooks.map(book => book.id).includes(updatedBook.id)){
        return prevBooks.map(book => {
            if (book.id === updatedBook.id){
                return {...book, updatedBook}
            }
            return book;
        })}
        else {return [...prevBooks, updatedBook]}
    })
  } 
  const fetchBooks = useCallback(async () => {
    await Axios.get("/books").then((res) => {
      setBooks(res.data);
    });
  }, []);
  
  const addBook = async (newBook: NewBook) => {
    const configs = { headers: { "Content-Type": "application/json" } };
    Axios.post("/add", newBook, configs)
      .then((res) => serverDecoder(res).then((id) => fetchBook(id)))
      .catch((error) => console.log(error));
  };
  
  const deleteBook = async (id: number) => {
    Axios.delete(`/delete/${id}`)
      .then((res) => serverDecoder(res).then(fetchBooks))
      .catch((error) => console.log(error));
  };
  
  const updateBook = async (
    fieldToModify: BookField,
    id: number,
    data: string | number | boolean
  ) => {
    const fieldToMsg = () => {
      switch (fieldToModify) {
        case BookField.Title:
          return { "newTitle": data };
        case BookField.Year:
          return { "newYear": data };
        case BookField.isInTheHouse:
          return { "newLocation": data };
      }
    };


    Axios.put(`/update/${id}`, fieldToMsg() )
      .then((res) => serverDecoder(res).then((id) => fetchBook(id)))
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
