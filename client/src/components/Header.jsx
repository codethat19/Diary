import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
// import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";

function Header(props) {
  function handleClick() {
    props.deletedNotes(0);
  }
  return (
    <header>
      <h1>
        <HighlightIcon />        
        yourNote
        <button onClick={handleClick}>
        <RestoreFromTrashIcon />
        </button>
        
      </h1>      
    </header>
  );
}

export default Header;
