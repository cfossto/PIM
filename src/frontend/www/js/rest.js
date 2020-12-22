async function get_notes() {
    let result = await fetch("/rest/notes");
    notes = await result.json();
    displayNotes();
    displayLists();
    searchTextField();
    searchFunction();
    updateNote();
}

async function create_note(note) {

    let result = await fetch("/rest/notes", {
        method: "POST",
        body: JSON.stringify(note)
    })
    .then(function() {window.location.href="index.html"});
}

async function update_note(note) {

    let edit_note = {
        id: note.id,
        title: note.title,
        list_id: note.list_id,
        text: note.text
    }
    
    let sender = await fetch("/rest/notes/id", {
        method: "PUT",
        body: JSON.stringify(edit_note)
    })
    .then(function() {window.location.href="index.html"});
    
}

async function delete_note(noteid) {

    deleteNote = parseInt(noteid);

    let result = await fetch("/rest/notes/id", {
        method: "DELETE",
        body: JSON.stringify(deleteNote)
    })
    .then(function(){window.location.href="index.html"})

}

async function get_note_lists() {
    let result = await fetch("/rest/lists");
    lists = await result.json()
        
        get_notes();
        showListsInCreateNote();
        updateList();

}

async function create_note_list(noteList) {

    let result = await fetch("/rest/lists", {
        method: "POST",
        body: JSON.stringify(noteList)
    })
    .then(function() { window.location.href="index.html"});
}

async function update_note_list(noteList) {
    
    let result = await fetch("/rest/lists/id", {
        method: "PUT",
        body: JSON.stringify(noteList)
    })
    .then(function(){window.location.href="index.html"});
    
}

async function delete_note_list(listId) {

    let result = await fetch("/rest/lists/id", {
        method: "DELETE",
        body: JSON.stringify(listId)

    })
    .then(function(){
        saveId(1,1);
        window.location.href="index.html"});
    
}

// Adding Images in uploads and in database
async function addImageRest(file, noteId) {
    let formData = new FormData();
    let filename = "/uploads/" + Date.now() + "-" + file.name;

    let fileObject = {
        note_id: noteId,
        category_id: 1,
        name: filename
    }

    // Sends file name for the database
    let result = await fetch("/rest/files", {
        method: "POST",
        body: JSON.stringify(fileObject)
    });

    formData.append('files', file, filename);

    files.push(fileObject);

    // Sends file to be added in uploads folder
    let uploadResult = await fetch('/rest/file-upload', {
        method: 'POST',
        body: formData
    });
}

async function getFilesRest() {
    let result = await fetch("/rest/files");
    files = await result.json();
}

async function deleteFileRest(fileId) {

    fileIdInt = parseInt(fileId);

    let result = await fetch("/rest/files/id", {
        method: "DELETE",
        body: JSON.stringify(fileIdInt)
    });
}

getFilesRest();
get_note_lists();
deleteImageFunctionality();

