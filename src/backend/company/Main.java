package backend.company;

import backend.company.database.Database;
import backend.company.notePack.Note;

import java.time.LocalDateTime;
import java.util.Date;


public class Main {

    public static void main(String[] args) {

        Database db = new Database();


        Note n = new Note(1, "Test","First");



    }
}
