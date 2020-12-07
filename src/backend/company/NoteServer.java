package backend.company;

import backend.company.database.Database;
import backend.company.notePack.Note;
import express.Express;
import express.middleware.Middleware;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

public class NoteServer {

    public NoteServer() {

        Express app = new Express();
        Database db = new Database();

        // test
        app.get("/", (req, res) -> {
            res.send("Testing!");
        });

        // Get notes from database
        app.get("/rest/notes", (req, res) -> {
            List<Note> notes = db.getNotes();

            res.json(notes);
        });




        try {
            app.use(Middleware.statics(Paths.get("src/frontend.www").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        app.listen(3050);
        System.out.println("Server started on port 3050.");


    }
}
