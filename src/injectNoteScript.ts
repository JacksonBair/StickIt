// //TODO: Remove unnecessary Console Logs
// //TODO: Clean Up
// //TODO: track url location?
interface Note {
	id: string;
	color: string;
	position: { top: number; left: number };
	innerhtml: string;
}

// //TODO: fix possible matching ids
function generateUniqueId(): string {
	return Math.random().toString(36).substr(2, 9);
}

function createNewNote(noteData: Note) {
	const noteElement = createNoteElement(noteData);
	document.body.appendChild(noteElement);
}

function createNoteElement(noteData: Note): HTMLElement {
	const noteContainer = document.createElement("div");
	noteContainer.innerHTML = noteData.innerhtml.trim();

	const noteElement = noteContainer.firstChild as HTMLElement;
	noteElement.style.backgroundColor = noteData.color;
	noteElement.style.top = `${noteData.position.top}px`;
	noteElement.style.left = `${noteData.position.left}px`;

	makeDraggable(noteElement);
	setupCloseButton(noteElement);

	return noteElement;
}

function setupCloseButton(noteElement: HTMLElement) {
	const closeButton = noteElement.querySelector(
		".close-note"
	) as HTMLButtonElement;
	if (closeButton) {
		closeButton.addEventListener("click", () => {
			document.body.removeChild(noteElement);
		});
	}
}

function makeDraggable(element: HTMLElement) {
	let offsetX: number, offsetY: number;
	let isDragging = false;

	element.addEventListener("mousedown", (event) => {
		offsetX = event.clientX - element.getBoundingClientRect().left;
		offsetY = event.clientY - element.getBoundingClientRect().top;
		isDragging = true;
		element.style.cursor = "grabbing";
	});

	document.addEventListener("mousemove", (event) => {
		if (isDragging) {
			element.style.left = `${event.clientX - offsetX}px`;
			element.style.top = `${event.clientY - offsetY}px`;
		}
	});

	document.addEventListener("mouseup", () => {
		isDragging = false;
		element.style.cursor = "grab";
	});
}

function handleCreateNoteRequest(color: string) {
	const noteData: Note = {
		id: generateUniqueId(),
		color: color,
		position: { top: 100, left: 100 },
		innerhtml: `
            <div class="note" style="background-color: ${color}; z-index: 2147483647; position: absolute; top: 100px; left: 100px; padding: 10px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);">
                <textarea class="note-content" style="width: 100%; height: 100px; background-color: ${color}; border: none; resize: none; outline: none; color: black;">New Note!!!!</textarea>
                <button class="close-note" style="position: absolute; top: 5px; right: 5px; background-color: ${color}; color: black; border: none; border-radius: 50%; width: 20px; height: 20px; cursor: pointer;">X</button>
            </div>
        `,
	};

	createNewNote(noteData);
	// TODO: Stringigying the note for stoage testing
	
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === "createNote") {
		handleCreateNoteRequest(request.color);
		console.log("NOTE INJECTED");
		sendResponse({ success: true });
		return true;
	}
});

// Exporting an array of notes
