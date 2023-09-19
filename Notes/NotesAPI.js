/*https://www.youtube.com/watch?v=01YKQmia2Jw&ab_channel=dcode*/
// interacts with local storage to retrieve save and delete our notes
export default class NotesAPI {
  static getALLNotes() {
    const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");
    //if there are no existing notes in the system or give us an empty array (incomplete)
    return notes;
  }

  static saveNote(noteToSave) {}

  static deleteNote(id) {}
}
