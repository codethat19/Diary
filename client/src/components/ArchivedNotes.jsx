import React, { useEffect } from "react";
import axios from "axios";
import NoteRender from "./NoteRender";

function ArchivedNotes (props) {
    const viewArchivedNotes = async (note) => {
        await axios.get('/archived')
        .then(res => {
            console.log(res.data)
            props.setNotes(res.data);
        })
        .catch( error => {
            console.log(error);
        });
      }
    

      useEffect( () => {


        viewArchivedNotes();
      },[]);

      return (
        <>
          {props.notes.map((noteItem, index) => {        
              return (
                <NoteRender
                  key={index}
                  id={noteItem._id}
                  title={noteItem.title}
                  content={noteItem.content}
                  onDelete={viewArchivedNotes}
                  flag={noteItem.flag}
                />
              );
            })}
        </>
      )
}

export default ArchivedNotes;