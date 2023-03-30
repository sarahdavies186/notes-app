const NotesModel = require('./notesModel')
const NotesView = require('./notesView')
const NotesClient = require('./notesClient')

const client = new NotesClient;
const model = new NotesModel;
// model.addNote('This is an example note')
const view = new NotesView(model, client);  
// client.createNote("BALBKABKA")
view.displayNotesFromApi();

client.loadNotes((notes) => {
  // This will be executed if notes are loaded correctly from the server
  model.setNotes(notes);
  view.displayNotes();
}, () => {
  // This will be executed if there's an error
  view.displayError();
});


