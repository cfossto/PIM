// För att använda följande funktioner kan följande användas:
// exempel: $.getScript("js/rest.js", function(){getNotes(); displayNotes()});

async function getNotes() {
    let result = await fetch("/rest/notes");
    notes = await result.json();
    displayNotes();
    updateNote();
}

async function createNote(note) {

    let result = await fetch("/rest/notes", {
        method: "POST",
        body: JSON.stringify(note)
    });
}

async function update_note(note) {

    let result = await fetch("/rest/notes/id", {
        method: "PUT",
        body: JSON.stringify(note)
    });

}

async function deleteNote(note) {

    let result = await fetch("/rest/notes/id", {
        method: "DELETE",
        body: JSON.stringify(note)
    });
}

async function getNoteLists() {
    let result = await fetch("/rest/lists");
    noteLists = await result.json();
}

async function createNoteList(noteList) {

    let result = await fetch("/rest/lists", {
        method: "POST",
        body: JSON.stringify(noteList)
    });
}

async function updateNoteList(noteList) {

    let result = await fetch("/rest/lists/id", {
        method: "PUT",
        body: JSON.stringify(noteList)
    });

}

async function deleteNoteList(noteList) {

    let result = await fetch("/rest/lists/id", {
        method: "DELETE",
        body: JSON.stringify(noteList)
    });
}

getNoteLists();
getNotes();
updateNote();