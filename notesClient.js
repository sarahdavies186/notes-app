class notesClient {
  loadNotes(callback, errorCallback) {
    fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((data) => {
        callback(data);
      })
      .catch((error) => {
        errorCallback(error);
      });
  }

  createNote(notes, callback, errorCallback) {
    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notes),
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        errorCallback(error);
      });
  }

  resetNotes(callback) {
    fetch("http://localhost:3000/notes", {
      method: "DELETE",
    })
    .then((response) => response.json())
    .then((data) => callback(data))
  }
}

module.exports = notesClient;

// fetch('http://localhost:3000/notes')
//       .then(response => response.json())
//       .then(data => {
//         console.log(data)
//       });
