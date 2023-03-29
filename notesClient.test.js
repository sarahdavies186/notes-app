const NotesClient = require('./notesClient');

require('jest-fetch-mock').enableMocks()

describe('NotesClient class', () => {
  it('calls fetch and loads the data', (done) => {
    const notesClient = new NotesClient();
    fetch.mockResponseOnce(JSON.stringify(["This note is coming from the server"]));
    notesClient.loadNotes((returnedData) => {
      expect(returnedData).toEqual(["This note is coming from the server"]);
      done();
    })
  })
})