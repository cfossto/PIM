package backend.company;

import backend.company.database.Database;
import backend.company.notePack.Note;
import backend.company.notePack.NoteList;
import express.Express;
import express.middleware.Middleware;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

public class NoteServer {
    private final Express app;
    private final Database db;

    public NoteServer() {
        app = new Express();
        db = new Database();
        setUpServer();
    }

    public void setUpServer() {
        // test
        app.get("/", (req, res) -> {
            res.send("Testing!");
        });

        // Get notes from database
        app.get("/rest/notes", (req, res) -> {
            List<Note> notes = db.getNotes();
            res.json(notes);
        });

        // Adds note
        app.post("/rest/notes", (req, res) -> {
            Note note = (Note) req.getBody(Note.class);
            db.createNote(note);
        });

        // Gets lists
        app.get("/rest/lists", (req, res) -> {
            List<NoteList> lists = db.getNoteList();

            res.json(lists);
        });

        app.post("/rest/lists", (req, res) -> {
            NoteList noteList = (NoteList) req.getBody(NoteList.class);
            db.createNoteList(noteList);
        });

        app.put("/rest/lists/:id", (request, response) -> {
            NoteList list = (NoteList) request.getBody(NoteList.class);
            db.updateNotelistName(list.getId(), list.getName());
        });

        app.delete("/rest/notes/:id", (request, response) -> {
            Note note = (Note) request.getBody(Note.class);
            db.deleteNote(note.getId());
        });

        app.delete("/rest/lists/:id", (request, response) -> {
            NoteList list = (NoteList) request.getBody(NoteList.class);
            db.deleteNoteList(list.getId());
        });

        app.put("/rest/notes", (request, response) -> {
            Note note = (Note) request.getBody(Note.class);
            // funktionen måste göras om när vi lägger till filer
            db.updateNote(note.getId(), note.getTitle(), note.getText(),note.getList_id());
        });




        try {
            app.use(Middleware.statics(Paths.get("src/frontend/www").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        app.listen(3050);
        System.out.println("Server started on port 3050.");

    }

}
