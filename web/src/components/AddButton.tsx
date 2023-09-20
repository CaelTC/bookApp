"use client"

import {Add} from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { THIRD_COLOR } from "../helpers/ColorHelpers";

interface Props {
    handleClick: () => void
}

function AddButton({handleClick}: Props) {
  return <Button variant="contained"  startIcon={<Add/>} onClick={handleClick} sx={{alignSelf: "center"}} > New Book</Button>;
}

export default AddButton;
