import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Collapse,
  Switch,
  FormControlLabel,
} from "@mui/material";
import DeleteButton from "./DeleteButton";
import { useState } from "react";
import { EditButton } from "./EditButton";
import { Book } from "../models/Books";
import { EditForm } from "./EditForm";

type BookProps = {
  book: Book;
  deleteBook: (id: number) => void;
  updateBook: (bookToUpdate: Book) => void;
};
export function BookCard(props: BookProps) {
  const { book, deleteBook, updateBook } = props;
  const [expanded, setExpended] = useState<boolean>(false);
  const handleExpandClick = () => {
    setExpended(!expanded);
  };
  const [isInTheCrackHouse, setIsIn] = useState<boolean>(book.isInTheHouse)
  const [isEditing, setEdition] = useState<boolean>(false);
  const handleOpenEdition = () => {
    setEdition(true);
  };
  const handleCloseEdition = () => {
    setEdition(false);
  };
  const handleSwitchChange = () => {
    const updatedBook: Book = {
      id: book.id,
      title: book.title,
      year: book.year,
      owner: book.owner,
      isInTheHouse: !isInTheCrackHouse,
    };

    setIsIn(!isInTheCrackHouse);
    updateBook(updatedBook);
  };  
    
    return (
    <Card
      sx={{
        position: "relative",
        width: "340px",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
      }}
    > {isEditing ?  <EditForm currentBook={book} sendUpdate={updateBook} closeEdition={handleCloseEdition}/> :
      <>
      <EditButton openEdition={handleOpenEdition}></EditButton>
      <DeleteButton handleDelete={() => deleteBook(book.id)} />
      <CardActions onClick={() => handleExpandClick()}>
        <CardContent sx={{ alignSelf: "flex-start" }}>
          <Typography variant="h5">{book.title}</Typography>
          <Typography variant="body2">{book.year}</Typography>
        </CardContent>
      </CardActions>
      <CardContent sx={{ alignSelf: "flex-start" }}>
        <Collapse in={expanded}>
          <FormControlLabel
            label="Is in the house"
            control={
              <Switch
                checked={isInTheCrackHouse}
                onChange={handleSwitchChange}
              />
            }
          />

          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            Owner {book.owner}
          </Typography>
        </Collapse>

        
      </CardContent></>}
    </Card>
  );
}

export default BookCard;
