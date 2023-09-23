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
  }
}
