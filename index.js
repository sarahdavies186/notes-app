const NotesModel = require('./notesModel')
const NotesView = require('./notesView')
const NotesClient = require('./notesClient')

const model = new NotesModel;
model.addNote('This is an example note')
const view = new NotesView(model);
view.displayNotes();
const client = new NotesClient;

