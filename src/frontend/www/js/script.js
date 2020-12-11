let notes = [];

let lists = [
    {
        id: 1,
        name: "Snabbanteckning"
    },
    {
        id: 2,
        name: "List Namn 1"
    },
    {
        id: 3,
        name: "List Namn 2"
    }
];




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
        createNote(newNote);
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


function displayNotes() {
    let allNotes = $("#all-notes");
    allNotes.empty();


    for (let note of notes) {

        allNotes.append(`
            <article class="note">
                <a href="edit-note.html" onclick="saveId(${note.id},${note.list_id})"><h2>${note.title}</h2>
                <p>${note.text}</p></a>
            </article>
        `);
    }

}

function displayLists() {
    let allLists = $("#all-lists");
    allLists.empty();

    for (let list of lists) {
        allLists.append(`
            <div class="list-item">
                <div class="list-name">${list.name}</div>
                <div class="notes-in-list">5</div>
            </div>
        `);
    }
}


function saveId(id,listId){

    localStorage.setItem("id",id)
    localStorage.setItem("listid",listId);

}


function updateNote(){

    let LocalStorageid = localStorage.getItem("id");
    let id = parseInt(LocalStorageid);



    for (let note of notes){
        console.log(id);
        console.log(note.id);

        if (id === note.id){
            let titleField = $("#note-title-input-edit").val(note.title);
            let noteListValue = $("#note-pick-list-edit").val(note.list_id);
            let noteBody = $("#note-text-input-edit").append(note.text);

            console.log(notes);


            $("#edit-note-button").click(function () {
                console.log("button");
                note.title = titleField.val();
                note.list_id = parseInt(noteListValue.val());
                note.text = noteBody.val();
                console.log(notes);
                update_note(note);
            });
        }
    }
}



displayNotes();
displayLists();
showListsInCreateNote();

