class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.mainContainerEl = document.querySelector('#main-container');
    this.buttonEl = document.querySelector('#add-note-button');
    this.buttonEl.addEventListener('click', () => {
      const note = document.querySelector('#note-input').value;
      //const input = document.querySelector('#note-input');
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
  }

  displayNotesFromApi() {
    this.client.loadNotes((data) => {
      this.model.setNotes(data)
      this.displayNotes()
    })
  }


}

module.exports = NotesView;