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

  it('clicks the button', () => {
    const model = new NotesModel();
    const view = new NotesView(model);
    const input = document.querySelector('#note-input');
    input.value = 'This is a note'
 
    const buttonEl = document.querySelector('#add-note-button');
    buttonEl.click();
    // model.addNote('This is a note');
    // view.displayNotes();

    expect(document.querySelectorAll('div.note').length).toBe(1);
    expect(document.querySelectorAll('div.note')[0].textContent).toBe('This is a note')
  });

  it('shows the correct number of notes on the page', () => {
    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote('Buy milk');
    view.displayNotes();
    view.displayNotes();
    expect(document.querySelectorAll('div.note').length).toBe(1);
  })
})