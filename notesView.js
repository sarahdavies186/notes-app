class NotesView {
  constructor(model) {
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container')
  }

  displayNotes() {
    const notes = this.model.getNotes();
    notes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.textContent = note;
      noteElement.className = 'note';
      this.mainContainerEl.append(noteElement);
    })
  }
}

module.exports = NotesView;