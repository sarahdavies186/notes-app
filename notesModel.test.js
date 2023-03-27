const notesModel = require('./notesModel')

describe('notesModel class', () => {
  let model;

  beforeEach(() => {
    model = new notesModel();
  });

  it('returns an empty string', () => {
    expect(model.getNotes()).toEqual([])
  })

  it('adds notes and returns them', () => {
    model.addNote('Buy milk');
    model.addNote('Go to the gym');
    expect(model.getNotes()).toEqual(['Buy milk', 'Go to the gym']);
  })

  it('resets the list', () => {
    model.reset();
    expect(model.getNotes()).toEqual([]);
  })

})