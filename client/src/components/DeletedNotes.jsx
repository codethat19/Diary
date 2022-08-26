import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';

function DeletedNote(props) {
  function handleClick() {
    props.onDelete(props.id);
  }
  if (!props.flag) {
    return (
      <div className="note">
        <div><h1>{props.title}</h1>
        <p>{props.content}</p>
        <button onClick={handleClick}>
          <RestoreFromTrashIcon />
        </button>
        </div>
      </div>
    );
  } else {
    return(
      <></>
    );
  }
  
}

export default DeletedNote;
