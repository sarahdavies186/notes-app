class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.mainContainerEl = document.querySelector('#main-container');
    this.buttonEl = document.querySelector('#add-note-button');
    
    this.buttonEl.addEventListener('click', () => {
      const note = document.querySelector('#note-input').value;
      
      // this.client.createNote(note, () => {
      //   this.displayNotesFromApi();
      // })

      this.addNewNote(note);
      this.displayNotes();
      
      document.getElementById("note-input").value='';
    })
  }

  displayNotes() {
    const clearNotes = document.querySelectorAll('div.note');
    clearNotes.forEach(note => {
      note.remove();
    });
    const notes = this.model.getNotes();
    notes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.textContent = note;
      noteElement.className = 'note';
      this.mainContainerEl.append(noteElement);
    })
  }

  addNewNote(note) {
    this.model.addNote(note)
    this.client.createNote(note
      , () => {
      this.displayError;
    }
    )
  }

  displayNotesFromApi() {
    this.client.loadNotes((data) => {
      this.model.reset()
      this.model.setNotes(data)
      // this.displayNotes()
     }
    , () => {
      this.displayError()
    })
  }

  displayError() {
    const errorElement = document.createElement('div');
    errorElement.textContent = "Oops, something went wrong!";
    errorElement.className = 'error';
    this.mainContainerEl.append(errorElement);
  }
}

module.exports = NotesView;