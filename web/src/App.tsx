"use client";
import ListBook from "./components/ListBooks";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Book } from "./models/Books";
import AddButton from "./components/AddButton";
import BookForm from "./components/NewBookForm";
import { Grid } from "@mui/material";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBookForm, setNewBookForm] = useState(false);
  const openModal = () => {
    setNewBookForm(true);
  };
  const closeModal = () => {
    setNewBookForm(false);
  };
  useEffect(() => {
    Axios.get("/books").then((res) => {
      setBooks(res.data);
    });
  }, []);


  return (
     <Grid container spacing={2} columns={1} flexDirection="column">
      <Grid item xs={1} >
        <ListBook
          books={books}
        />
      </Grid>
      <Grid item xs={1} sx={{alignSelf: "center"}}>
        <AddButton handleClick={openModal} />
      </Grid>
          <BookForm open={newBookForm} close={closeModal}/>
    </Grid> 
  );
}

export default App;
