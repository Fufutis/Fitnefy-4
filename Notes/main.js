import NotesAPI from "./NotesAPI.js";

NotesAPI.saveNote({
  id: 32909,
  title: "The title has changed",
  body: "WAGWAN g",
});
console.log(NotesAPI.getALLNotes());
