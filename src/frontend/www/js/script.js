let notes = [];

let lists = [];

let files = [];

function isUrl(txtStr) {

    // The most popular domain extensions
    var topDomains = ["com", "de", "org", "net", "us", "c", "edu", "gov", "biz", "za", "info", "cc", "ca", "cn", "fr", "ch", "au", "in", "jp", "be", "it", "nl", "uk", "mx", "no", "ru", "br", "se", "es", "at", "dk", "eu", "il"];

    // The following will give a good enough answer for our assignment. We
    // allow a String without the 'http(s)://' beginning and also allowing 'http(s)://'
    // without a following 'www.'(so not strictly url:s in those cases).


    for (domExt of topDomains) {
        var pattStr = `^((https?:\\/\\/(((www)\\.)?)|((www)\\.))(\\w[-\\w]*\\w)\\.)${domExt}($|\\/)`;
        patt = new RegExp(pattStr, "i")
            if (txtStr.match(patt)) {
                return true;
            }
        }
    return false;
}

function addHyperLinks(noteText) {
    noteText = replaceWeirdSymbols(noteText); // look for '<' and '>'

    // Check if 'str' is a url and if it starts with https.
    var strArr = noteText.split(/\40/);
    let noteTextAltered = "";
    for (let str of strArr) {

        if (isUrl(str) && str.match(/^https?:\/\/.+/i)) {
            str = `<a href=${str} class="hyper-link">${str}</a> `;
        }
        // Make sure url starts with 'https://' inside the tag. Won't be seen in the notes.
        else if (isUrl(str)) {
            str = `<a href=https://${str} class="hyper-link">${str}</a> `;
        }

        noteTextAltered = noteTextAltered + str + " ";
    }
    return noteTextAltered;
}

function replaceWeirdSymbols(str) {
    // Replace '<' with its corresponding symbol notation in order to
    // avoid bugs in the text
    let rgx = /</g
    str = str.replace(rgx,"&lt;");

    // Replace '>' with its corresponding symbol notation in order to
    // avoid bugs in the text
    rgx = />/g
    str = str.replace(rgx,"&gt;");

    return str;
}

function addNote() {
    let noteTitleInput = $("#note-title-input").val();
    let notePickList = $("#note-pick-list-edit").val();
    let noteTextInput = $("#note-text-input").val();
    // Need to check if the text have problematic symbols and replace them.
    noteTextInput = replaceWeirdSymbols(noteTextInput);

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
        localStorage.setItem("justCreatedList", true);
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
    // Putting this here, because it's the first code to excecute
    if(sessionStorage.getItem("browserStarted") == null) {
        sessionStorage.setItem("browserStarted", "true");
        localStorage.setItem("listid", 1);
        localStorage.setItem("justCreatedList", "false");
    }
    let allLists = $("#note-pick-list-edit");
    allLists.empty();
    allLists.append(`<option></option>`);

    for (let list of lists) {
        allLists.append(`
            <option value="${list.id}" ${list.id == localStorage.getItem("listid") ? "selected" : ""}>${list.name}</option>
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
    let lastIncrement;
    for (list of lists) {
        lastIncrement = list.id;
    }

    if (localStorage.getItem("justCreatedList") == "true") {
        localStorage.setItem("justCreatedList", "false");
        localStorage.setItem("listid", lastIncrement);
    }
    pickedListId = parseInt(localStorage.getItem("listid"));

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
                    <a href="edit-note.html" onclick="saveId(${note.id},${note.list_id})">
                        <h2>${note.title}</h2>
                        <p>${addHyperLinks(note.text)}</p>
                        <div class="note-images-${note.id}"></div>
                    </a>
                </article>
            `);
            displayImages(note.id);
        }
    }

}

function displayLists() {
    let allLists = $("#all-lists");
    allLists.empty();

    for (let list of lists) {
        allLists.append(`
            <a onclick="saveId(1, ${list.id}), displayNotes()">
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
            let noteBody = $("#note-text-input-edit").append(replaceWeirdSymbols(note.text));

            displayImagesEditNote(note.id);

            // On click: update note to changed values
            $("#edit-note-button").click(function () {
                addImage(note.id);
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

// Adding Images
function addImage(noteId) {
    if( document.querySelector("#image-to-upload").files.length === 0 ){
        console.log("no files selected");
        return;
    }
    let files = document.querySelector('input[type=file]').files;
    let formData = new FormData();

    addImageRest(formData, files, noteId);
}

// creates place where images is shown on edit-note then calls displayImages()
function displayImagesEditNote(noteId) {
    if (window.location.href.indexOf("edit-note") > -1) {
        let imagesInEditNote = $(".images-in-edit-note");
        imagesInEditNote.empty();
        imagesInEditNote.append(`<div class="note-images-${noteId}"></div>`);

        for (let file of files) {
            if(file.note_id === noteId) {
                let splitImageName = file.name.split("/").join(".").split(".").join("-").split("-");
                let altText = splitImageName[3];

                $('.note-images-' + noteId).append(`
                    <div class="img-wrap">
                        <span class="delete-image-button close">&times;</span>
                        <img src="${file.name}" height="200px" width="200px" alt="${altText}" id="${file.id}">
                    </div>
                `);
            }
        }
    }
}

// displays image
function displayImages(noteId) {
    for (let file of files) {
        if(file.note_id === noteId) {
            let splitImageName = file.name.split("/").join(".").split(".").join("-").split("-");
            let altText = splitImageName[3];

            $('.note-images-' + noteId).append(`<img src="${file.name}" height="200px" width="200px" alt="${altText}">`);
        }
    }
}

function deleteImageFunctionality() {

    $(document).on('click', '.delete-image-button', function(){
        let imgWrap = this.parentElement;
        console.log(imgWrap.children[1].id);
        let fileIdToRemove = imgWrap.children[1].id;
        imgWrap.parentElement.removeChild(imgWrap);
        deleteFileRest(fileIdToRemove);
    });
}


function changeWindow(){

    ("Anteckningen borttagen")
    window.location.href="index.html"
}



function deleteNoteFunctionalty(){

    // Takes the stored id and parses it correctly
    let LocalStorageid = localStorage.getItem("id");
    let id = parseInt(LocalStorageid);

    // Show confirmation window 
    let confirmWindow = confirm("Är du säker?");

    // If user clicks ok - deletes entry in database
    if (confirmWindow){

        // REST-call
        delete_note(id);

    // If user clicks cancel show an 
    } else {
        alert("Avbröt borttagning");
    }
}

function deleteListFunctionality () {

    // Takes the stored id and parses it correctly
    let LocalStorageListid = localStorage.getItem("listid");
    let listId = parseInt(LocalStorageListid);

    // Shows confirmation window

    let confirmWindow = confirm("Är du säker? \nOBS! Detta tar även bort alla anteckningar i listan.");
    // If user clicks ok - list is removed from db.
    if (confirmWindow){

        // loops through all notes
        for (allNotes of notes){
            // finds all notes with current list_id
            if (listId === allNotes.list_id){

                delete_note(allNotes.id)
            }
        }
        delete_note_list(listId);

    // If user clicks cancel show an alert
    } else {
        alert("Avbröt borttagning");
    }

}


function searchTextField(){

        // Select textfield
        let field = document.querySelector("#textfield");

        // Returns if no textfield
        if(!field) {
            return;
        }

        // Eventlistener on keyup - trigger search function
        field.addEventListener("keyup",function(){
            $(".searchListElem").remove();
            searchResult = []
            searchFunction()
        })

        field.addEventListener("keydown", function (){

           $(".listRow").remove()
           searchResult = []
        })

}


function searchFunction(){

    // Empty search result
    let searchResult = [];

    // Return if no textfield
    if(!document.querySelector("#textfield")) {
        return;
    }

    // Get value from textfield
    let question = document.querySelector("#textfield").value;
    question = question;

    // Define list-field
    let dropDown = document.querySelector(".drop-down");


    // Search field cannot be empty
    if (question != "" && question != " "){

        // Filter notes with RegExp
        var re = new RegExp(question, 'ig');
        let textsearch = notes.filter(n => n.text.match(re)); // regex and match() with help of Konstantin
        let titlesearch = notes.filter(n => n.title.match(re));

        totalResult = [...textsearch,...titlesearch]

        searchResult = [...new Set(totalResult)]

        // Loop through list and get each result
        for (let result of searchResult){
            $("searchListElem").remove()
            dropDown.insertAdjacentHTML("afterend",`
                <a class="listRow" href="edit-note.html" onclick="saveId(${result.id},${result.list_id})">
                    <h2 class="searchListElem">${result.title}</h2>
                </a>
            `)
            searchResult = []
        }
    }
}


showListsInCreateNote();
addList();