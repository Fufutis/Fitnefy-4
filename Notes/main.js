import NotesView from "./NotesView.js";
import NotesAPI from "./NotesView.js";

const app = document.getElementById("app");
const view = new NotesView(app, {
  onNoteAdd() {
    console.log("ADDED NEW NOTE");
  },
  onNoteEdit(newTitle, newBody) {
    console.log(newTitle);
    console.log(newBody);
  },
  //onNoteAdd
  //onNoteEdit
  //onNoteDelete
});
/*import NotesAPI from "./NotesAPI.js";

NotesAPI.saveNote({
  id: 32909,
  title: "The title has changed",
  body: "WAGWAN g",
});

NotesAPI.deleteNote();
console.log(NotesAPI.getALLNotes());
*/
