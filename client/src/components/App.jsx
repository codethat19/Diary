import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  const viewNotes = async () => {
    // const flag = JSON.stringify( setFlag );
    //console.log(flag);
    const res = await axios.get('/view')
    .then(res => {
      setNotes(res.data);
      //console.log(res.data)
      console.log(notes)
    })
    .catch( error => {
      console.log(error);
    });
  }
  
  useEffect( () => {  
    viewNotes();
  },[]);
  // useEffect( () => {
  //   viewNotes();
  // },[]);
  //viewNotes();
  const viewDeletedNotes = async (note) => {
    // const res = await axios.get('/deletedNotes')
    // .then(res => {
    //   const deletedNotes = res.data;
    //   setNotes(deletedNotes);
    //   console.log(notes);
    // })
    // .catch( error => {
    //   console.log(error);
    // });
    const res = await axios.get('/view')
      .then(res => {
        console.log(res.data)
        setNotes(res.data);
      })
      .catch( error => {
        console.log(error);
      });
  }
  const addNote = async (note) => {
      const newNote = JSON.stringify( note );

      const res = await axios.post('/addNote', newNote)
      .then(response => {
        viewNotes();
        console.log("Addition Successful")
        console.log(newNote)
      })
      .catch( error => {
        console.log(error);
      });
  };
  const deleteNote = async (id) => {
    let res = await axios.post('/deleteNote', id)
    .then(response => {
      viewNotes();
      console.log("Deletion Successful");
    })
    .catch( error => {
      console.log(error);
    });
  };
  return (
    <div>
      <Header deletedNotes={viewNotes}/>
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            flag={noteItem.flag}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
