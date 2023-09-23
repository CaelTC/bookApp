"use client";

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import {  TEXT_COLOR, THIRD_COLOR } from '../helpers/ColorHelpers';

interface DeleteButtonProps {
    handleDelete: () => void;
  }
function DeleteButton ({handleDelete}: DeleteButtonProps){
  
    return <IconButton
     onClick={handleDelete} 
     style={{position: "absolute",
    top: 5,
    left: 310,
    padding: "0.3rem",
    backgroundColor: THIRD_COLOR, // Background color of the circle
    borderRadius: "50%", // Makes the background circle-shaped
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Optional shadow
    color: TEXT_COLOR,
    zIndex: 2}}
    >
    <DeleteIcon/>
    </IconButton>
}

export default DeleteButton