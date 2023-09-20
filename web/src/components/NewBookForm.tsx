"use client";

import { TextField, Button, Stack, Switch, DialogContent, DialogContentText, Dialog, DialogTitle, FormControlLabel} from "@mui/material";
import Moment from "moment";
import { bookEncoder } from "../communication/Out";
import { ErrorMessage,  Form, Formik,  FormikState} from "formik";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Axios from "axios";
import { serverDecoder } from "../communication/In";
import { PRIMARY_COLOR } from "../helpers/ColorHelpers";

type FormValues = {
  title: string;
  year: Moment.Moment;
  isInTheHouse: boolean;
}

type BookFormProps = {
  open : boolean,
  close: () => void;
}
function BookForm({open, close}: BookFormProps) {
  const handleSubmit = (values: FormValues) => {
    const bookData = bookEncoder(
      values.title,
      values.year.toDate().getFullYear(),
      values.isInTheHouse
    );
    const configs = { headers: { "Content-Type": "application/json" } };
    Axios.post("/add", bookData, configs)
      .then((res) => serverDecoder(res))
      .catch((error) => serverDecoder(error));
  };
  return (
    <Dialog open={open} onClose={close}>
      <DialogContent >
        <DialogTitle>Add new book</DialogTitle>
      <Formik
        initialValues={{ title: "", year: Moment(), isInTheHouse: Boolean }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = "Required";
          }
          return errors;
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
              <ErrorMessage name="tit</Container>le" />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Year of publication"
                  views={["year"]}
                  value={formik.values.year || null}
                  onChange={(date) => formik.setFieldValue("year", date)}
                />
              </LocalizationProvider>
              <FormControlLabel control={<Switch
                id="isInTheHouse"
                value={formik.values.isInTheHouse}
                onChange={formik.handleChange}
              />} label="Is in the house"></FormControlLabel>
            <Button type="submit">Add</Button>
            </Stack>
          </Form>
        )}
      </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default BookForm;
