"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewNote = createNewNote;
// note element
function createNewNote() {
    const note = document.createElement("note");
    note.className = "note";
    note.innerHTML = `
    <textarea class="note-content" placeholder="Type your note here!"></textarea>
    <button class="close-note">X</button>
    `;
    makeDraggable(note);
    document.body.appendChild(note);
    const closeButton = note.querySelector(".close-note");
    closeButton.addEventListener("click", () => {
        document.body.removeChild(note);
    });
    console.log("Note window opened");
}
//draggable
function makeDraggable(element) {
    let offsetX, offsetY, isDragging = false;
    element.addEventListener("mousedown", (event) => {
        offsetX = event.clientX - element.getBoundingClientRect().left;
        offsetY = event.clientY - element.getBoundingClientRect().top;
        isDragging = true;
    });
    document.addEventListener("mousemove", (event) => {
        if (isDragging) {
            element.style.left = `${event.clientX - offsetX}px`;
            element.style.top = `${event.clientY - offsetY}px`;
        }
    });
    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
}
