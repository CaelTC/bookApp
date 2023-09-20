"use client";

import DeleteIcon from '@mui/icons-material/Delete';
import Axios from 'axios';
import { Book } from "../models/Books";
import Button from '@mui/material/Button';

interface Props {
    bookToDelete: Book;
  }
function DeleteButton ({bookToDelete}: Props){
    const idToDelete = bookToDelete.id
    const handleClick = () => {
        Axios.delete(`/delete/${idToDelete}`)
    }
    return <Button 
     onClick={handleClick} 
    startIcon={<DeleteIcon/>}>
    
    </Button>
}

export default DeleteButton