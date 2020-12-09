let notes = [
    {
        id: 1,
        title: "Anteckning Titel 1",
        list_id: 1,
        text: "Phasellus gravida semper nisi. Aenean ut eros et nisl sagittis vestibulum. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.\n" +
        "\n" +
        "Mauris sollicitudin fermentum libero. Etiam rhoncus. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor.\n" +
        "\n" +
        "Phasellus blandit leo ut odio. Nullam sagittis.."
    },
    {
        id: 2,
        title: "Anteckning Titel 2",
        text: "Phasellus gravida semper nisi. Aenean ut eros et nisl sagittis vestibulum. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.\n" +
        "\n" +
        "Mauris sollicitudin fermentum libero. Etiam rhoncus. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor.\n" +
        "\n" +
        "Phasellus blandit leo ut odio. Nullam sagittis.."
    },
    {
        id: 3,
        title: "Anteckning Titel 2",
        text: "Phasellus gravida semper nisi. Aenean ut eros et nisl sagittis vestibulum. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.\n" +
        "\n" +
        "Mauris sollicitudin fermentum libero. Etiam rhoncus. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor.\n" +
        "\n" +
        "Phasellus blandit leo ut odio. Nullam sagittis.."
    }
];

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
    let notePickList = $("#note-pick-list").val();
    let noteTextInput = $("#note-text-input").val();
    let newNote = {};

    errorMessage(noteTitleInput, notePickList, noteTextInput)

    if(noteTitleInput && notePickList && noteTextInput) {
        newNote = {
            title: noteTitleInput,
            list_id: notePickList,
            text: noteTextInput
        }
        notes.push(newNote);

        $("#userInput").val("");
    } else {
        console.log("Fält får ej vara tomt");
    }

    console.log(notes);
}

function showListsInCreateNote() {
    let allLists = $("#note-pick-list");
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
                <a href="edit-note.html" onclick="saveId(${note.id})"><h2>${note.title}</h2>
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


function saveId(id){

    localStorage.setItem("id",id)

}


// Example id. Real id from call from other page?

// Loads notes on opening of page
function loadNoteFromId(){

    let id = localStorage.getItem("id")

    for (let note of notes){

        // Checks loop for post with correct id
        if (id == note.id){

            // Displays note values in the right fields
            $("#note-title-input").val(note.title);
            $("#note-pick-list").val(note.list_id);
            $("#note-text-input").append(note.text);
        }
    }
}



// Selects all fields and updates to list
function updateNote(id){

    $("#add-note-button").click(function (){

        // Get note info from fields
        let noteId = id;
        let noteTitle = $("#note-title-input").val();
        let noteList_id = $("#note-pick-list").val();
        let noteText = $("#note-text-input").val();

        // Story in new note
        newNote = { 
            id: noteId,
            title: noteTitle,
            list_id:noteList_id,
            text: noteText
         }

        // Takes the id from note, affects only one object, replaces with newNote
        notes.splice(id,1,newNote)
        
        console.log(notes)

    })

}



displayNotes();
displayLists();
showListsInCreateNote()
loadNoteFromId();
// updateNote(id);