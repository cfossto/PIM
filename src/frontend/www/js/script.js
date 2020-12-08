let notes = [
    {
        title: "Anteckning Titel 1",
        text: "Phasellus gravida semper nisi. Aenean ut eros et nisl sagittis vestibulum. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.\n" +
        "\n" +
        "Mauris sollicitudin fermentum libero. Etiam rhoncus. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor.\n" +
        "\n" +
        "Phasellus blandit leo ut odio. Nullam sagittis.."
    },
    {
        title: "Anteckning Titel 2",
        text: "Phasellus gravida semper nisi. Aenean ut eros et nisl sagittis vestibulum. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.\n" +
        "\n" +
        "Mauris sollicitudin fermentum libero. Etiam rhoncus. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor.\n" +
        "\n" +
        "Phasellus blandit leo ut odio. Nullam sagittis.."
    },
    {
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
        name: "Snabbanteckning"
    },
    {
        name: "List Namn 1"
    },
    {
        name: "List Namn 2"
    }
];


function displayNotes() {
    let allNotes = $("#all-notes");
    allNotes.empty();

    for (let note of notes) {
        allNotes.append(`
            <article class="note">
                <h2>${note.title}</h2>
                <p>${note.text}</p>
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

displayNotes();
displayLists();