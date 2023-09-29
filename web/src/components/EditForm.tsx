import { Form, Formik } from "formik";
import { Book } from "../models/Books";
import moment from "moment";
import { BookFormValues } from "../models/Forms";
import { TextField, Button, Stack, CardContent } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

type EditBookFormProps = {
  currentBook: Book;
  sendUpdate: (value: Book) => void;
  closeEdition: () => void;
};

export function EditForm({
  currentBook,
  sendUpdate,
  closeEdition,
}: EditBookFormProps) {
  const handleSubmit = (values: BookFormValues) => {
    const bookData: Book = {
      id: currentBook.id,
      title: values.title,
      year: values.year.toDate().getFullYear(),
      bookState: currentBook.bookState,
      owner: values.owner,
      lender: currentBook.lender,
    };
    sendUpdate(bookData);
    closeEdition();
  };
  return (
    <CardContent>
      <Formik
        initialValues={{
          title: currentBook.title,
          year: moment().year(currentBook.year),
          owner: currentBook.owner,
        }}
        onSubmit={(v) => handleSubmit(v)}
      >
        {(formik) => (
          <Form onSubmit={(values) => formik.handleSubmit(values)}>
            <Stack spacing={2}>
              <TextField
                id="title"
                name="title"
                label="title"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
              <TextField
                id="owner"
                name="owner"
                label="Owner"
                value={formik.values.owner}
                onChange={formik.handleChange}
              />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Year of publication"
                  views={["year"]}
                  value={formik.values.year || null}
                  onChange={(date) => formik.setFieldValue("year", date)}
                />
              </LocalizationProvider>
              <Button variant="contained" type="submit">
                Save
              </Button>
              <Button variant="outlined" onClick={closeEdition}>
                {" "}
                Cancel
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </CardContent>
  );
}

export default EditForm;
