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

    } else {
        console.log("Fält får ej vara tomt");
    }

}

function addList() {
    
    // errorMessage(noteListNameInput);
    
    $("#add-list-button").click(function() {

        let noteListNameInput = $("#list-name-input").val();
        
        let newList = {};
        
        if(noteListNameInput) {
            newList = {
                name: noteListNameInput
            }
     
            lists.push(newList);
            create_note_list(newList);
           
        } else {
            console.log("Fält får ej vara tomt");
        }
    })

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
   //searchFunction()
}

function displayLists() {
    let allLists = $("#all-lists");
    allLists.empty();

    for (let list of lists) {
        allLists.append(`
            <a onclick="displayNotes(${list.id}), saveId(1, ${list.id})">
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
                note.title = titleField.val();
                note.list_id = parseInt(noteListValue.val());
                note.text = noteBody.val();
                
                // Back-end-call
                update_note(note);
            });
        }
    }
}

// Updates notes in database
function updateListName(){

    // Takes the stored id and parses it correctly
    let listId = parseInt(localStorage.getItem("listid"));
    // Loops through lists
    for (let list of lists){
        // Selects all info already in the fields
        if (listId === list.id){
            let noteListName = $("#list-name-input-edit").val(list.name);

            // On click: update lists to changed values
            $("#edit-list-button").click(function () {
                list.name = noteListName.val();
                update_note_list(list);
                console.log("Uppdaterat");

            });
        }
    }
}

function deleteNoteFunctionality(){

    // Takes the stored id and parses it correctly
    let LocalStorageid = localStorage.getItem("id");
    let id = parseInt(LocalStorageid);

    // Show confirmation window 
    let confirmWindow = confirm("Är du säker?");

    // If user clicks ok - deletes entry in database
    if (confirmWindow){

        // REST-call
        delete_note(id);

    // If user clicks cancel show an alert  
    } else {
        alert("Avbröt borttagning");
    }
}

function deleteListFunctionality () {
    
    // Takes the stored id and parses it correctly
    let LocalStorageListid = localStorage.getItem("listid");
    let listId = parseInt(LocalStorageListid);

    // Shows confirmation window

    let confirmWindow = confirm("Är du säker?");
    // If user clicks ok - list is removed from db.
    if (confirmWindow){

        delete_note_list(listId);

    // If user clicks cancel show an alert  
    } else {
        alert("Avbröt borttagning");
    }
    
}


function searchTextField(){

        // Select textfield
        let field = document.querySelector("#textfield")

        // Eventlistener on keyup - trigger search function
        field.addEventListener("keyup",function(){
            searchFunction()
        })

        // Clear dropdown on key-down for refresh of search
        field.addEventListener("keydown",function (){
            document.querySelector(".drop-li").innerHTML=""
        })

    }


function searchFunction(){

    // Empty search result
    let searchResult = [];

    // Get value from textfield
    let question = document.querySelector("#textfield").value
    question = question;

    // Define list-field
    let dropDown = document.querySelector(".drop-down-list");

    // Filter notes with RegExp
    var re = new RegExp(question, 'ig');
    let textsearch = notes.filter(n => n.text.match(re)); // regex and match() with help of Konstantin
    let titlesearch = notes.filter(n => n.title.match(re));

    // Switch if title or text result
    if (question != ""){

        if (textsearch != ""){

        // Loop through text in notes
         for (let i = 0; i<textsearch.length; i++){
    
            console.log("Textresult " + (searchResult.length+1)+" "+textsearch[i].text)

            searchResult.push(textsearch[i]) // push for experimental usage
            dropDown.insertAdjacentHTML("afterend",`<li class="drop-li">${textsearch[i].text}</li>`)
        }
    }else{
        // Loop through titles in notes
        for (let i = 0; i<titlesearch.length; i++){
    
            console.log("Titelseach: "+titlesearch[i].title)
            searchResult.push(titlesearch[i]) // push for experimental usage

            dropDown.insertAdjacentHTML("afterend",`<li class="drop-li">${titlesearch[i].text}</li>`)
        }  
    }
}

}



showListsInCreateNote();
addList();