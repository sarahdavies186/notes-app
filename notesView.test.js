/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesModel = require('./notesModel');
const NotesView = require('./notesView');

describe('Page view', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
  })

  it('displays a list of notes', () => {
    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote('Buy milk');
    model.addNote('Go to the gym');
    view.displayNotes();
    expect(document.querySelectorAll('div.note').length).toBe(2);
  })
})