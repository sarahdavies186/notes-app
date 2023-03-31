class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.mainContainerEl = document.querySelector('#main-container');
    this.buttonEl = document.querySelector('#add-note-button');
    this.resetButton = document.querySelector('#delete-all-button')
    
    this.buttonEl.addEventListener('click', () => {
      const note = document.querySelector('#note-input').value;
      const noteObj = {"content": note}
        this.client.createNote(noteObj, (data) => {
          console.log(data)
          this.displayNotesFromApi()},
          () => {
                this.displayError()}
        )
      
      // this.addNewNote(note);
      // this.displayNotes();
      
      document.getElementById("note-input").value='';
    })
    
    this.resetButton.addEventListener('click', () => {
      this.client.resetNotes(() => {
        this.resetAllNotes();
      });
      // this.model.reset();
      // this.displayNotes();
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

  displayNotesFromApi() {
    this.client.loadNotes((data) => {
      console.log(data)
      this.model.reset()
      this.model.setNotes(data)
      this.displayNotes()
     }
    // 
    )
  }

  displayError() {
    const errorElement = document.createElement('div');
    errorElement.textContent = "Oops, something went wrong!";
    errorElement.className = 'error';
    this.mainContainerEl.append(errorElement);
  }

  resetAllNotes() {
    const clearNotes = document.querySelectorAll('div.note');
    clearNotes.forEach(note => {
      note.remove();
    });
  }
}

module.exports = NotesView;