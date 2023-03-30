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

  createNote(data, errorCallback) {
    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: data }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        errorCallback(error);
      });
  }
}

module.exports = notesClient;

// fetch('http://localhost:3000/notes')
//       .then(response => response.json())
//       .then(data => {
//         console.log(data)
//       });
