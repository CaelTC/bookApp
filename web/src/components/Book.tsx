import {
  Card,
  CardContent,
  Box,
  Container,
  Typography,
  CardActions,
  Collapse,
  Grid,
  Dialog,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import DeleteButton from "./DeleteButton";
import { useState } from "react";
import { EditButton } from "./EditButton";
import { Book } from "../models/Books";
import { EditForm } from "./EditForm";
import { LendButton } from "./LendButton";
import { BookState } from "../models/Books";
import Chevron from "./Chevron";
import { Form, Formik } from "formik";

type BookProps = {
  book: Book;
  deleteBook: (id: number) => void;
  updateBook: (bookToUpdate: Book) => void;
};
export function BookCard(props: BookProps) {
  const { book, deleteBook, updateBook } = props;
  const [expanded, setExpended] = useState<boolean>(false);
  const [askedLending, setAskedLending] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpended(!expanded);
  };
  const [isEditing, setEdition] = useState<boolean>(false);
  const [isLending, setLending] = useState<BookState>(BookState.AtTheHouse);
  const handleOpenEdition = () => {
    setEdition(true);
  };
  const switchLendingFunction = () => {
    switch (book.bookState) {
      case BookState.Lent:
        return handleRetrieveClick();
      case BookState.AtTheHouse:
        return handleLendClick();
    }
  };

  const handleLendClick = () => {
    setAskedLending(true);
  };
  const handleRetrieveClick = () => {
    updateBook({ ...book, bookState: BookState.AtTheHouse });
  };
  const handleCloseEdition = () => {
    setEdition(false);
  };
  const confirmLendSubmit = (lender: string) => {
    setAskedLending(false);
    updateBook({ ...book, bookState: BookState.Lent, lender: lender });
  };
  return (
    <Card
      sx={{
        position: "relative",
        width: "340px",
      }}
    >
      {" "}
      {isEditing ? (
        <EditForm
          currentBook={book}
          sendUpdate={updateBook}
          closeEdition={handleCloseEdition}
        />
      ) : (
        <>
          <Grid>
            <EditButton openEdition={handleOpenEdition}></EditButton>
            <DeleteButton handleDelete={() => deleteBook(book.id)} />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
              }}
            >
              <CardContent
                sx={{
                  alignSelf: "flex-start",
                }}
              >
                <Typography variant="h5">{book.title}</Typography>
                <Typography variant="body2">{book.year}</Typography>
              </CardContent>
              <LendButton
                bookState={book.bookState}
                handleClick={switchLendingFunction}
              ></LendButton>
            </CardContent>
            <CardActions
              sx={{
                margin: "0px",
                padding: "0px",
              }}
            >
              {book.bookState === BookState.Lent ? (
                <Typography sx={{ paddingLeft: "0.8rem" }} variant="body1">
                  Lended to: {book.lender}{" "}
                </Typography>
              ) : null}
              <Chevron expand={expanded} onClick={handleExpandClick} />
            </CardActions>
            <CardContent sx={{ alignSelf: "flex-start", padding: "0px" }}>
              <Collapse in={expanded}>
                <Typography variant="body2">Owner: {book.owner}</Typography>
              </Collapse>
            </CardContent>
          </Grid>
          <Dialog open={askedLending} onClose={() => setAskedLending(false)}>
            <Formik
              initialValues={{ lender: "" }}
              onSubmit={(values) => confirmLendSubmit(values.lender)}
            >
              {(formik) => (
                <Form onSubmit={(values) => formik.handleSubmit(values)}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography variant="body1" sx={{ alignSelf: "center" }}>
                        Lend a book
                      </Typography>
                      <TextField
                        id="lender"
                        name="lender"
                        label="To"
                        value={formik.values.lender}
                        onChange={formik.handleChange}
                      ></TextField>
                      <Stack spacing={0.5}>
                        <Button variant="contained" type="submit">
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => setAskedLending(false)}
                        >
                          {" "}
                          Cancel
                        </Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Form>
              )}
            </Formik>
          </Dialog>
        </>
      )}
    </Card>
  );
}

export default BookCard;
