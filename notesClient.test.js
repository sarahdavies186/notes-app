/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesClient = require('./notesClient');

require('jest-fetch-mock').enableMocks()

describe('NotesClient class', () => {

  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    fetch.resetMocks()
  })


  it('calls fetch and loads the data', (done) => {
    const notesClient = new NotesClient();
    fetch.mockResponseOnce(JSON.stringify(["This note is coming from the server"]));
    notesClient.loadNotes((returnedData) => {
      expect(returnedData).toEqual(["This note is coming from the server"]);
      done();
    })
  })

  xit("creates a new note in the web server", (done) => {
    const client = new NotesClient()
    fetch.mockResponseOnce(JSON.stringify(['test note']))
    const response = client.createNote('test note')
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 'content': 'test note' }),
    });
    done();
  })

  // it("creates a new note in the web server", async () => {
  //   const client = new NotesClient()
  //   fetch.mockResponseOnce(JSON.stringify(['test note']))
  //   const response = await client.createNote('test note')
  //   expect(response.ok).toBe(true)
  //   expect(response.status).toBe(true)
  // })


})