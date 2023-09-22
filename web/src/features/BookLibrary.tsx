"use client";
import { useBooks } from "../hooks/Books";
import { Grid} from "@mui/material";
import { BookCard } from "../components/Book";
import BookForm from "../components/NewBookForm";

export function BookLibrary() {
  const { books, addBook, deleteBook, updateBook } = useBooks();
  return (
    <Grid container spacing={2} >
      {books.map((book) => (
        <Grid item sm={6}   sx={{display: "flex"}}  key={book.id}>
          <BookCard
            key={book.id}
            title={book.title}
            year={book.year}
            id={book.id}
            owner={book.owner}
            isInTheHouse={book.isInTheHouse}
            deleteBook={deleteBook}
            updateBook={updateBook}
          ></BookCard>
        </Grid>
      ))}
      <BookForm addBook={addBook} />
    </Grid>
  );
}
