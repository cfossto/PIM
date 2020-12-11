async function get_notes() {
    let result = await fetch("/rest/notes");
    notes = await result.json();
    displayNotes();
    updateNote();
}

async function create_note(note) {

    let result = await fetch("/rest/notes", {
        method: "POST",
        body: JSON.stringify(note)
    });
}

async function update_note(note) {

    let edit_note = {
        id: note.id,
        title: note.title,
        list_id: note.list_id,
        text: note.text
    }
    
    let result = await fetch("/rest/notes/id", {
        method: "PUT",
        body: JSON.stringify(edit_note)
    });


}

async function delete_note(noteid) {

    deleteNote = parseInt(noteid);

    let result = await fetch("/rest/notes/id", {
        method: "DELETE",
        body: JSON.stringify(deleteNote)
    });

}



async function get_note_lists() {
    let result = await fetch("/rest/lists");
    lists = await result.json();
    displayLists();	
}

async function create_note_list(noteList) {

    let result = await fetch("/rest/lists", {
        method: "POST",
        body: JSON.stringify(noteList)
    });
}

async function update_note_list(noteList) {

    let result = await fetch("/rest/lists/id", {
        method: "PUT",
        body: JSON.stringify(noteList)
    });

}

async function delete_note_list(noteList) {

    let result = await fetch("/rest/lists/id", {
        method: "DELETE",
        body: JSON.stringify(noteList)
    });
}

get_note_lists();
get_notes();
update_note();
