package backend.company;


import backend.company.database.Database;
import backend.company.notePack.Note;
import backend.company.notePack.NoteList;

import javax.xml.crypto.Data;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.*;
import java.time.format.DateTimeFormatter;

public class Main {

    public static void main(String[] args) {

        Database db = new Database();

//        db.populate();

        NoteServer ns = new NoteServer();




    }


}