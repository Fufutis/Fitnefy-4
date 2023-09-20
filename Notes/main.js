import NotesAPI from "./NotesAPI.js";

NotesAPI.saveNote({
  title: "New Note!",
  body: "I am a new note.",
});
console.log(NotesAPI.getALLNotes());
