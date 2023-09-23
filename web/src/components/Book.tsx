"use client";

import { Card, CardContent, Typography, CardActions, Collapse, Switch, FormControlLabel } from "@mui/material";
import DeleteButton from "./DeleteButton";
import { useState } from "react";
import { BookField } from "../models/Books";
type BookProps = {
  title: string;
  year: number;
  id: number;
  isInTheHouse: boolean;
  owner: string;
  deleteBook: (id: number) => void;
  updateBook: (fieldToModify: BookField, id: number, data: string|number|boolean ) => void;
};
export function BookCard(props: BookProps) {
  const { title, year, id, isInTheHouse, owner,  deleteBook, updateBook} = props;
  const [expanded, setExpended] = useState<boolean>(false);
  const handleExpandClick = () => {
    setExpended(!expanded);
  };
  const [isInTheCrackHouse, setIsIn] = useState<boolean>(isInTheHouse)
  const handleSwitchChange = () => {
      setIsIn(!isInTheCrackHouse)
      updateBook(BookField.isInTheHouse, id, !isInTheCrackHouse);
  }
  const location = isInTheHouse ? "In the house" : "Elsewhere";
  return (
    <Card
      sx={{
        position: "relative",
        minWidth: "350px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <DeleteButton handleDelete={() => deleteBook(id)} />
      <CardActions  onClick={() => handleExpandClick()}>
        <CardContent sx={{alignSelf: "flex-start"}} >
          <Typography   variant="h5">
            {title}
          </Typography>
          <Typography  variant="body2">
            {year}
          </Typography>
        </CardContent>
      </CardActions>
        <CardContent sx={{alignSelf: "flex-start"}}>
          <Collapse in={expanded}>
          
          <FormControlLabel label="Is in the house" control={<Switch checked={isInTheCrackHouse} onChange={handleSwitchChange}/>}/>

          <Typography variant="body2" sx={{fontSize: "0.8rem"}}>Owner {owner}</Typography>
          </Collapse>
        </CardContent>
    </Card>
  );
}

export default BookCard;
