/**
 * @jest-environment jsdom
 */
require("jest-fetch-mock").enableMocks();

const fs = require('fs');
const NotesModel = require('./notesModel');
const NotesView = require('./notesView');
const NotesClient = require('./notesClient');


describe('Page view', () => {
  let model;
  let client;
  let view;

  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    client = new NotesClient();
    model = new NotesModel();
    view = new NotesView(model, client);
    fetchMock.doMock()
    fetch.resetMocks();
  })

  it('displays a list of notes', () => {
    model.addNote('Buy milk');
    model.addNote('Go to the gym');
    view.displayNotes();
    expect(document.querySelectorAll('div.note').length).toBe(2);
  })

  // it('clicks the button', () => {
  //   const input = document.querySelector('#note-input');
  //   input.value = 'This is a note'
 
  //   const buttonEl = document.querySelector('#add-note-button');
  //   buttonEl.click();
  //   // model.addNote('This is a note');
  //   // view.displayNotes();

  //   expect(document.querySelectorAll('div.note').length).toBe(1);
  //   expect(document.querySelectorAll('div.note')[0].textContent).toBe('This is a note')
  // });

  it('shows the correct number of notes on the page', () => {
    model.addNote('Buy milk');
    view.displayNotes();
    view.displayNotes();
    expect(document.querySelectorAll('div.note').length).toBe(1);
  })

  xit('displays notes from the api', async () => {
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

  // xit('creates a new note when the user clicks the button', async () => {
  //   // 1. fill in the form field and click submit
  //   // 2. post request /notes 
  //   // 3. 
    
    
    
  //   const mockClient = {
  //     loadNotes: jest.fn(),
  //     createNote: jest.fn()
  //   }
  //   const newView = new NotesView(model, mockClient)
  //   const client = new NotesClient()
  //   // fetch.mockResponseOnce(JSON.stringify(['test note']))
  //   // const response = await client.createNote('test note')
  //   mockClient.createNote.mockResponseValueOnce(JSON.stringify('test note'))

  //   // fakeClient.createNote.mockImplementation()
    
  //   const input = document.querySelector('#note-input');
  //   input.value = 'test note'
  //   const buttonEl = document.querySelector('#add-note-button');
  //   await buttonEl.click();
  //   expect(document.querySelectorAll('div.note').length).toBe(1)
  // });

  it('shows an error message if HTTP request fails', () => {
    view.displayError();
    expect(document.querySelector('div.error').textContent).toBe('Oops, something went wrong!')
  }) 
})

// .then(data => console.log(callback(data)))