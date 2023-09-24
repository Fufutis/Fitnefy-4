export default class NotesView {
  constructor(root,{ onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) 
  {
    this.root = root;                   //to generally call them later on
    this.onNoteSelect = onNoteSelect;   //to generally call them later on
    this.onNoteAdd = onNoteAdd;         //to generally call them later on
    this.onNoteEdit = onNoteEdit;       //to generally call them later on
    this.onNoteDelete = onNoteDelete;   //to generally call them later on
    this.root.innerHTML = `
      <div class="notes__sidebar">
        <button class="notes__add" type="button">Add Note</button>
        <div class="notes__list"></div>
      </div>
      <div class="notes__preview">
        <input class="notes__title" type="text" placeholder="New Note">
        <textarea class="notes__body">Upgrade1</textarea>
      </div>
    `;

    const btnAddNote = this.root.querySelector(".notes__add");
    const inpTitle = this.root.querySelector(".notes__title");
    const inpBody = this.root.querySelector(".notes__body");

    btnAddNote.addEventListener("click", () => {
        this.onNoteAdd();
    });

    [inpTitle, inpBody].forEach(inputField => {
        inputField.addEventListener("blur", () => {
            const updatedTitle = inpTitle.value.trim();
            const updatedBody = inpBody.value.trim();

            this.onNoteEdit(updatedTitle, updatedBody);
        });
    });

    console.log(this._createListItemHTML(300, "Hey", "Yeah mate", new Date()))
  }

  _createListItemHTML(id,title,body,updated){
    const MAX_BODY_LENGTH=60;

    return `
      <div class="notes__list-item" data-note-id"${id}">
        <div class="notes__small-title">${title}</div>
        <div class="notes__small-body">
        ${body.substring(0,MAX_BODY_LENGTH)}
        ${body.length>MAX_BODY_LENGTH ?"...":""}
        </div>
        <div class="notes__small-updated">
        ${updated.toLocaleString(undefined, {dataStyle: "full", timeStyle: "short"})}
        </div>
      </div>
    `
    
  }
  updatedNoteList(notes){
    const notesListCointainer = this.root.querySelector(".notes__list");

  //empty list
    notesListCointainer.innerHTML = "";
    
    for (const note of notes){
      const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));

      notesListCointainer.insertAdjacentHTML("beforeend", html);
    }
  }
}