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

displayNotes();