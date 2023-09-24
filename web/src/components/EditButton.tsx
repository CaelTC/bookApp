import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'
import {  TEXT_COLOR,  SECONDARY_COLOR } from '../helpers/ColorHelpers';

type EditButtonProps = {
    openEdition: () => void
}
export function EditButton({openEdition}:EditButtonProps){

    return <IconButton style={{position: "absolute",
    top: 5,
    left: 260,
    padding: "0.3rem",
    backgroundColor: SECONDARY_COLOR, // Background color of the circle
    borderRadius: "50%", // Makes the background circle-shaped
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Optional shadow
    color: TEXT_COLOR,
    zIndex: 2}} onClick={openEdition}><EditIcon/></IconButton>
}

export default EditButton;