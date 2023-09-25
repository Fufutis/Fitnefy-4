import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js";

const app = document.getElementById("app");
const view = new NotesView(app, {
  onNoteAdd() {
    console.log("ADDED NEW NOTE");
  },
  onNoteEdit(newTitle, newBody) {
    console.log(newTitle);
    console.log(newBody);
  },
  onNoteSelect(id) {
    console.log("Note Selected:" + id);
  },
  //onNoteAdd
  //onNoteEdit
  //onNoteDelete
});
/*import NotesAPI from "./NotesAPI.js";

NotesAPI.saveNote({
  id: 322909,
  title: "The ti2tle has changed",
  body: "WAGW2AN g",
});
*/
//NotesAPI.deleteNote();
//console.log(NotesAPI.getALLNotes());

view.updatedNoteList(NotesAPI.getALLNotes());