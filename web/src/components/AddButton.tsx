"use client"

import {Add} from "@mui/icons-material";
import { Button, ThemeProvider } from "@mui/material";
import { buttonTheme } from "../helpers/ColorHelpers";

interface Props {
    handleClick: () => void
}

function AddButton({handleClick}: Props) {
  return <ThemeProvider theme={buttonTheme}><Button variant="contained" color="secondary" startIcon={<Add/>} onClick={handleClick} sx={{alignSelf: "center"}} > New Book</Button></ThemeProvider>;
}

export default AddButton;
