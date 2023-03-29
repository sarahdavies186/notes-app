const NotesModel = require('./notesModel')
const NotesView = require('./notesView')
const NotesClient = require('./notesClient')

const client = new NotesClient;
const model = new NotesModel;
// model.addNote('This is an example note')
const view = new NotesView(model, client);  
// client.createNote("BALBKABKA")


