let notes = [];

let lists = [];




function addNote() {
    let noteTitleInput = $("#note-title-input").val();
    let notePickList = $("#note-pick-list-edit").val();
    let noteTextInput = $("#note-text-input").val();
    let newNote = {};

    // errorMessage(noteTitleInput, notePickList, noteTextInput);

    if(noteTitleInput && notePickList && noteTextInput) {
        newNote = {
            title: noteTitleInput,
            list_id: notePickList,
            text: noteTextInput
        }


        $("#note-title-input").val("");
        $("#note-text-input").val("");
        notes.push(newNote);
        create_note(newNote);
        window.location.pathname = "/index.html";

    } else {
        console.log("Fält får ej vara tomt");
    }

}

function addList() {
    let noteListNameInput = $("#list-name-input").val();
    
    let newNote = {};

    // errorMessage(noteListNameInput);

    if(noteListNameInput) {
        newList = {
            name: noteListNameInput
        }


        $("#list-name-input").val("");
        lists.push(newList);
        create_note_list(newList);
        window.location.pathname = "/index.html";

    } else {
        console.log("Fält får ej vara tomt");
    }

}

function showListsInCreateNote() {
    let allLists = $("#note-pick-list-edit");
    allLists.empty();

    allLists.append('<option disabled selected>Välj Lista...</option>');

    for (let list of lists) {
        allLists.append(`
            <option value="${list.id}">${list.name}</option>
        `);
    }
}

function errorMessage(noteTitleInput, notePickList, noteTextInput) {
    // Error message
    let errorNoTitle = $(".error-no-title");
    let errorNoList = $(".error-no-list");
    let errorNoText = $(".error-no-text");
    errorNoTitle.empty();
    errorNoList.empty();
    errorNoText.empty();

    if (!noteTitleInput) {
        errorNoTitle.append("Fältet får ej vara tomt!")
    }
    if (!notePickList) {
        errorNoList.append("Fältet får ej vara tomt!")
    }
    if (!noteTextInput) {
        errorNoText.append("Fältet får ej vara tomt!")
    }
}


function displayNotes(pickedListId = 1) {
    let allNotes = $("#all-notes");
    allNotes.empty();
    let listTitle = $("#list-title-frontpage");

    for (let list  of lists) {
        if (pickedListId === list.id) {
            listTitle.empty();
            listTitle.append(list.name);
        }
    }


    for (let note of notes) {

        if(pickedListId === note.list_id) {
            allNotes.append(`
            <article class="note">
                <a href="edit-note.html" onclick="saveId(${note.id},${note.list_id})"><h2>${note.title}</h2>
                <p>${note.text}</p></a>
            </article>
        `);
        }
    }

}

function displayLists() {
    let allLists = $("#all-lists");
    allLists.empty();

    for (let list of lists) {
        allLists.append(`
            <a onclick="displayNotes(${list.id})">
                <div class="list-item">
                    <div class="list-name">${list.name}</div>
                <div class="notes-in-list">${countNotesInList(list.id)}</div>
            </div>
            </a>
        `);
    }
}

function countNotesInList(listId) {
    let count = 0;
    for (let note of notes) {
        if(note.list_id === listId) {
            count++;
        }
    }
    return count;
}


function saveId(id,listId){

    localStorage.setItem("id",id)
    localStorage.setItem("listid",listId);

}

// Updates notes in database
function updateNote(){

    // Takes the stored id and parses it correctly
    let LocalStorageid = localStorage.getItem("id");
    let id = parseInt(LocalStorageid);


    // Loops through notes
    for (let note of notes){

        // Selects all info alredy in the fields
        if (id === note.id){
            let titleField = $("#note-title-input-edit").val(note.title);
            let noteListValue = $("#note-pick-list-edit").val(note.list_id);
            let noteBody = $("#note-text-input-edit").append(note.text);

            // On click: update note to changed values
            $("#edit-note-button").click(function () {
                console.log("button");
                note.title = titleField.val();
                note.list_id = parseInt(noteListValue.val());
                note.text = noteBody.val();
                console.log(notes);

                // Back-end-call
                update_note(note);
            });
        }
    }
}




function changeWindow(){

    alert("Anteckningen borttagen")
    window.location.href="index.html"
}



function deleteNoteFunctionalty(){

    // Takes the stored id and parses it correctly
    let LocalStorageid = localStorage.getItem("id");
    let id = parseInt(LocalStorageid);

    // On click - deletes entry in database
    $("#delete-note-button").click(function () {

        // REST-call
        delete_note(id);
        changeWindow();
    })
}

displayLists();
displayNotes();
showListsInCreateNote();
deleteNoteFunctionalty();