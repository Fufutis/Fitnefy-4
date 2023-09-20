/*https://www.youtube.com/watch?v=01YKQmia2Jw&ab_channel=dcode*/
// interacts with local storage to retrieve save and delete our notes
export default class NotesAPI {
  static getALLNotes() {
    const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");
    //if there are no existing notes in the system or give us an empty array (incomplete)
    return notes.sort((a, b) => {
      //sorts the array to latest based on the date
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  static saveNote(noteToSave) {
    const notes = NotesAPI.getALLNotes();
    const existing = notes.find((note) => note.id == noteToSave.id);

    if (existing) {
      existing.title = noteToSave.title;
      existing.body = noteToSave.body;
      existing.updated = new Date().toISOString();
    } else {
      noteToSave.id = Math.floor(Math.random() * 1000000); //creates an id for a note
      noteToSave.updated = new Date().toISOString(); //timestamp for our note again (bcs we are creating one here so we are bringing it to existance)d

      notes.push(noteToSave); //saves the note
    }
    localStorage.setItem("notesapp-notes", JSON.stringify(notes));
  }

  static deleteNote(id) {}
}
