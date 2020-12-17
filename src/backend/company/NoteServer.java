package backend.company;

import backend.company.database.Database;
import backend.company.files.File;
import backend.company.notePack.Note;
import backend.company.notePack.NoteList;
import express.Express;
import express.middleware.Middleware;
import org.apache.commons.fileupload.FileItem;

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
            res.send("ok");
        });

        // Gets lists
        app.get("/rest/lists", (req, res) -> {
            List<NoteList> lists = db.getNoteList();

            res.json(lists);
        });

        app.post("/rest/lists", (req, res) -> {
            NoteList noteList = (NoteList) req.getBody(NoteList.class);

            System.out.println(noteList.toString());

            db.createNoteList(noteList);
            res.send("ok");
        });

        app.put("/rest/lists/:id", (request, response) -> {
            NoteList list = (NoteList) request.getBody(NoteList.class);
            db.updateNotelistName(list.getId(), list.getName());
            response.send("ok");
        });

        app.delete("/rest/notes/:id", (request, response) -> {
            Note note = (Note) request.getBody(Note.class);
            db.deleteNote(note.getId());
            response.send("ok");
        });

        app.delete("/rest/lists/:id", (request, response) -> {
            NoteList list = (NoteList) request.getBody(NoteList.class);
            db.deleteNoteList(list.getId());
            response.send("ok");
        });

        app.put("/rest/notes/:id", (request, response) -> {
            Note note = (Note) request.getBody(Note.class);
            // funktionen måste göras om när vi lägger till filer
            db.updateNote(note.getId(), note.getTitle(), note.getList_id(), note.getText());
            response.send("ok");
        });

        // Adding image in uploads folder
        app.post("/rest/file-upload", (req, res) -> {
            String imageUrl = null;

            try{
                List<FileItem> files = req.getFormData("files");
                imageUrl = db.uploadImage(files.get(0));
            } catch (Exception e) {
                System.out.println("No Image Uploaded");
            }


            res.send(imageUrl);
        });

        // Adding file to db
        app.post("/rest/files", (req, res) -> {
            File file = (File) req.getBody(File.class);
            db.createFile(file);
            res.send("ok");
        });

        // Get files from database
        app.get("/rest/files", (req, res) -> {
            List<File> files = db.getFiles();
            res.json(files);
        });

        // Delete file
        app.delete("/rest/files/:id", (request, response) -> {
            File file = (File) request.getBody(File.class);
            db.deleteFile(file.getId());
            response.send("ok");
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
