package backend.company;

import backend.company.database.Database;
import backend.company.notePack.Note;
import express.Express;

import java.util.List;

public class NoteServer {

    public NoteServer() {

        Express app = new Express();
        Database db = new Database();

        // test
        app.get("/", (req, res) -> {
            res.send("Testing!");
        });

        app.listen(3050);
        System.out.println("Server started on port 3050.");
    }
}
