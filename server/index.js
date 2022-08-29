const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/yourNoteDB') ;
mongoose.connection.on('connected', () => console.log('Connected'));

const noteSchema = new mongoose.Schema(
    {
        userId: {
            type: Number
        },
        flag: {
            type: Number,
            default: 1,
            required: true
        },
        title: {
            type: String,
            default: "test_note_title",
            required: true
        },
        content: {
            type: String,
            default: "test_note_content",
            required: true
        },
    },
    {
        timestamps: {
          createdAt: true,
          updatedAt: true
        },
    }
);

const userSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    userPassword: String,
    notes: [noteSchema]
});

const User = mongoose.model("User", userSchema);
const Note = mongoose.model("Note", noteSchema);

function CreateNote(newNote) {
    const { title, content } = newNote;
    const note = new Note ({
        title: title,
        content: content
    });
    const result = note.save();
    return;
}

app.get('/', (req, res) => {
    res.redirect('/view');
})

app.get('/view', (req, res) => {
    // let note = (Object.keys(req.body));
    // const lengthNote = note.length;
    // // // console.log(lengthNote);
    // // // console.log(note);
    // let flg;
    // if (lengthNote) {
    //     flg = 1
    // } else {
    //     flg = 0
    // }
    // if (note === []) {
    //     note = 0;
    // }
    
    // const newFlag = JSON.parse(note);
    // console.log(lengthNote);
    // console.log(note[0]);
    // if (newFlag==='1') {
    //     flg=1
    // } else {
    //     flg=0
    // }
    //console.log(flg);
    console.log("Reached viewNotes");
    const notes  = Note.find({flag: 1}, (err, foundNotes) => {  
        //console.log(foundNotes);  
        res.send(foundNotes);
    });    
})
app.get('/deletedNotes', (req, res) => {
    console.log("Reached deletedNotes");
    const deletedNote  = Note.find({flag: 0}, (err, foundDeletedNotes) => {  
        res.send(foundDeletedNotes);
    });
    // res.redirect('/view');    
})
app.get('/archived', (req, res) => {
    console.log("Reached archivedNotes");
    const archivedNote  = Note.find({flag: 2}, (err, foundArchivedNotes) => {  
        res.send(foundArchivedNotes);
    });    
    // res.redirect('/view');
})
app.post('/addNote', (req, res) => {
    //const bdy = JSON.parse(req.body);
    //console.log(req.body);
    const note = JSON.parse((Object.keys(req.body)));
    const noteTitle = note.title;
    const noteContent = note.content;
    const addNewNote = new Note ({
        title: noteTitle,
        content: noteContent
    });

    CreateNote(addNewNote);
    // mongoose.connection.close();
    res.redirect('/view');
})

app.post("/deleteNote", (req, res) => {
    // const note = JSON.parse((Object.keys(req.body)));
    // const id = note._id;
    const id = (Object.keys(req.body));
    //console.log(id);
    Note.findByIdAndUpdate(id, {flag: 0}, (err) => {
        if (err) {
            console.log(err);
        } else {
            // console.log("Successfully Deleted");
        }
    })
    // mongoose.connection.close();
    res.redirect('/view');
});
app.post("/archive", (req, res) => {
    // const note = JSON.parse((Object.keys(req.body)));
    // const id = note._id;
    const id = (Object.keys(req.body));
    //console.log(id);
    Note.findByIdAndUpdate(id, {flag: 2}, (err) => {
        if (err) {
            console.log(err);
        } else {
            // console.log("Successfully Deleted");
        }
    })
    // mongoose.connection.close();
    res.redirect('/view');
});
app.post("/unarchive", (req, res) => {
    // const note = JSON.parse((Object.keys(req.body)));
    // const id = note._id;
    const id = (Object.keys(req.body));
    //console.log(id);
    Note.findByIdAndUpdate(id, {flag: 1}, (err) => {
        if (err) {
            console.log(err);
        } else {
            // console.log("Successfully Deleted");
        }
    })
    // mongoose.connection.close();
    res.redirect('/view');
});
app.post("/permaDeleteNote", (req, res) => {
    const id = (Object.keys(req.body));
    Note.findByIdAndDelete(id, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully Deleted");
        }
    })
    res.redirect('/view');
});
// app.post("/recover", (req, res) => {
//     const id = (Object.keys(req.body));
//     Note.findByIdAndUpdate(id, {flag: 1}, (err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             // console.log("Successfully Deleted");
//         }
//     })
//     // mongoose.connection.close();
//     res.redirect('/view');
// });

app.listen(process.env.PORT || port, () => {
    console.log("Server running at port: " + port);
  });