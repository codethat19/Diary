const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/yourNoteDB') ;
mongoose.connection.on('connected', () => console.log('Connected'));

const noteSchema = new mongoose.Schema(
    {
        flag: {
            type: Number,
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
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
function CreateNote() {
    const note1 = new Note ({
        flag: 0,
        title: "Test Note 2- Deleted",
        content: "Test Note 2's content...asdasdas asdas"
    });
    //const result = note2.save();
    const result = note1.save();
    console.log(result);
}


app.get('/', (req, res) => {
    //CreateNote();
    const notes  = Note.find({flag: 1}, (err, foundNotes) => {
        //console.log(foundNotes);        
        res.send(foundNotes);
    });    
})
app.get('/deleted', (req, res) => {
    //CreateNote();
    const notes  = Note.find({flag: 0}, (err, foundNotes) => {
        //console.log(foundNotes);        
        res.send(foundNotes);
    });    
})

//mongoose.connection.close();

app.listen(process.env.PORT || port, () => {
    console.log("Server running at port: " + port);
  });