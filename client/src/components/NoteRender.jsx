import React, { useState } from "react";
import DeleteIcon  from "@material-ui/icons/Delete";
// import EditIcon from "@material-ui/icons/Edit";
import RestoreIcon from "@material-ui/icons/Restore";
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import axios from "axios";

function NoteRender(props) {
  const [style, setStyle] = useState({visibility: 'hidden'});

    async function deleteNote(id) {
      id=props.id;
      await axios.post('/deleteNote', id)
      .then(response => {
         props.onDelete();
         console.log("Deletion Successful");
      })
      .catch( error => {
        console.log(error);
      });
    };
  // function handleEdit() {
  //   console.log("handleEdit");
  // }
  async function handleRecover(id) {
    console.log("handleRecover");
    id=props.id;
      await axios.post('/unarchive', id)
      .then(response => {
         props.onRecovery();
         console.log("Bin recovery Successful");
      })
      .catch( error => {
        console.log(error);
      });
  }
  async function handleArchive(id) {
    console.log("Deletion Successful");
    id=props.id;
      await axios.post('/archive', id)
      .then(response => {
         props.onArchive();
         console.log("Archival Successful");
      })
      .catch( error => {
        console.log(error);
      });
  }
  async function handleUnArchive(id) {
    console.log("handleArchive");
    id=props.id;
      await axios.post('/unarchive', id)
      .then(response => {
         props.onDelete();
         console.log("Unarchival Successful");
      })
      .catch( error => {
        console.log(error);
      });
  }
   function permaDelete(id) {
    id=props.id;
     axios.post('/permaDeleteNote', id)
    .then(response => {
        props.onPermaDelete();
        console.log("Permanent Deletion Successful");
    })
    .catch( error => {
      console.log(error);
    });
  }
  
  let element = <></>;

  if (props.flag === 1) {
    element = <>
      <button  style={style} className="noteButton" onClick={deleteNote}><DeleteIcon /></button>
      {/* <button style={style} onClick={handleEdit}><EditIcon /></button> */}
      <button  style={style} className="noteButton" onClick={handleArchive}><ArchiveIcon /></button>
      </>
  } else if (props.flag === 0) {
      element = <>       
        <button  style={style} className="noteButton" onClick={permaDelete}><DeleteIcon /></button>
        <button  style={style} className="noteButton" onClick={handleRecover}><RestoreIcon /></button>
      </>
  } else if (props.flag === 2){
    element = <>
      <button  style={style} className="noteButton" onClick={handleUnArchive}><UnarchiveIcon /></button>
      <button  style={style} className="noteButton" onClick={deleteNote}><DeleteIcon /></button>
      </>
  }

  return(
        <div className="note"   onMouseEnter={e => {
          setStyle({visibility: 'visible'}); 
      }}
      onMouseLeave={e => {
          setStyle({visibility: 'hidden'})
      }}
      >
          <div><h1>{props.title}</h1>
          <p>{props.content}</p>
          {element}
          </div>
        </div>
      );
    }

export default NoteRender;
