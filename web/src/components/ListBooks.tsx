import DeleteButton from "./DeleteButton";
import { Book } from "../models/Books";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { PRIMARY_COLOR } from "../helpers/ColorHelpers";

export type ListBookProps = {
  books: Book[];
};

function ListBook(props: ListBookProps) {
  const { books } = props;

  return (
    <>
      <Grid container spacing={2} alignContent="center" columns={1}>
        <Grid item xs={12} sm={1}>
          <Typography variant="h3" align="center">
            Books
          </Typography>
        </Grid>
        <Grid item xs={12} sm={1}>
          <List sx={{ backgroundColor: PRIMARY_COLOR }}>
            {books.map((item, index) => (
              <ListItem>
                <ListItemButton
                  key={item.id}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <ListItemText
                    primary={item.title}
                    secondary={item.year}
                  ></ListItemText>
                  <DeleteButton bookToDelete={item}></DeleteButton>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  );
}

export default ListBook;
