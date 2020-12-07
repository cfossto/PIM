package backend.company;


import backend.company.database.Database;
import backend.company.notePack.Note;
import backend.company.notePack.NoteList;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class Main {

    public static void main(String[] args) {


        Database db = new Database();

        System.out.println(db.getNotes());

    }


}
