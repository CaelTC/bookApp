"use client";

import {
  TextField,
  Button,
  Stack,
  Switch,
  DialogContent,
  Grid,
  Dialog,
  DialogTitle,
  FormControlLabel,
} from "@mui/material";
import Moment from "moment";
import { NewBook } from "../models/Books";
import { ErrorMessage, Form, Formik } from "formik";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AddButton from "./AddButton";
import { useState } from "react";

type FormValues = {
  title: string;
  year: Moment.Moment;
  isInTheHouse: boolean;
  owner: string;
};

type BookFormProps = {
  addBook: (values: NewBook) => void;
};
function BookForm({ addBook }: BookFormProps) {
  const [open, setOpen] = useState(false);

  const handleAddDialogClose = () => {
    setOpen(false);
  };

  const handleAddDialogOpen = () => {
    setOpen(true);
  };
  const handleSubmit = (values: FormValues) => {
    const bookData: NewBook = {
      title: values.title,
      year: values.year.toDate().getFullYear(),
      isInTheHouse: values.isInTheHouse,
      owner: values.owner,
    };
    addBook(bookData);
    handleAddDialogClose();
  };
  return (
    <>
      <Grid item xs={12} sm={12} alignContent="center">
        <AddButton handleClick={handleAddDialogOpen} />
      </Grid>
      <Dialog open={open} onClose={handleAddDialogClose}>
        <DialogContent>
          <DialogTitle>Add new book</DialogTitle>
          <Formik
            initialValues={{
              title: "",
              year: Moment(),
              isInTheHouse: false,
              owner: "",
            }}
            onSubmit={(v) => handleSubmit(v)}
          >
            {(formik) => (
              <Form onSubmit={(s) => formik.handleSubmit(s)}>
                <Stack spacing={2}>
                  <TextField
                    id="title"
                    name="title"
                    label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                  />
                  <ErrorMessage name="title" />
                  <TextField
                    id="owner"
                    name="owner"
                    label="Owner"
                    value={formik.values.owner}
                    onChange={formik.handleChange}
                  />
                  <ErrorMessage name="owner" />
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      label="Year of publication"
                      views={["year"]}
                      value={formik.values.year || null}
                      onChange={(date) => formik.setFieldValue("year", date)}
                    />
                  </LocalizationProvider>
                  <FormControlLabel
                    control={
                      <Switch
                        id="isInTheHouse"
                        value={formik.values.isInTheHouse}
                        onChange={formik.handleChange}
                      />
                    }
                    label="Is in the house"
                  ></FormControlLabel>
                  <Button variant="outlined" onClick={handleAddDialogClose}>
                    {" "}
                    Cancel
                  </Button>
                  <Button variant="contained" type="submit">
                    Add
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BookForm;
