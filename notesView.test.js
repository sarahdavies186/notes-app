/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesModel = require('./notesModel');
const NotesView = require('./notesView');
const NotesClient = require('./notesClient');

const jestFetchMock = require("jest-fetch-mock");
jestFetchMock.enableMocks();

describe('Page view', () => {
  let model;
  let view;
  let client;

  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    client = new NotesClient();
    model = new NotesModel();
    view = new NotesView(model, client);
    fetch.resetMocks();
  })

  it('displays a list of notes', () => {
    model.addNote('Buy milk');
    model.addNote('Go to the gym');
    view.displayNotes();
    expect(document.querySelectorAll('div.note').length).toBe(2);
  })

  it('clicks the button', () => {
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
    model.addNote('Buy milk');
    view.displayNotes();
    view.displayNotes();
    expect(document.querySelectorAll('div.note').length).toBe(1);
  })

  it('displays notes from the api', async () => {
    const fakeClient = {
      loadNotes: jest.fn()
    }
    fakeClient.loadNotes.mockImplementation((callback) => {
      callback(["This note is coming from the server"])
    })
    const newView = new NotesView(model, fakeClient)
    await newView.displayNotesFromApi();
    expect(document.querySelector('div.note').textContent).toBe('This note is coming from the server')
    
  })
})