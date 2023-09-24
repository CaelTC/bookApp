"use client";
import { useBooks } from "../hooks/Books";
import { Grid} from "@mui/material";
import { BookCard } from "../components/Book";
import BookForm from "../components/NewBookForm";
import { Book } from "../models/Books";

export function BookLibrary() {
  const { books, addBook, deleteBook, updateBook } = useBooks();
  return (
    <Grid container spacing={2} alignContent={"center"} >
      {books.map((book: Book) => (
        <Grid item sm={6}   sx={{display: "flex"}}  key={book.id}>
          <BookCard
            key={book.id}
            book={book}
            deleteBook={deleteBook}
            updateBook={updateBook}
          ></BookCard>
        </Grid>
      ))}
      <BookForm addBook={addBook} />
    </Grid>
  );
}
