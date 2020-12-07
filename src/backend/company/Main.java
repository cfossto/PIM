package backend.company;


import backend.company.database.Database;
import backend.company.notePack.Note;

public class Main {

    public static void main(String[] args) {

        Database db = new Database();

        //Note n = new Note(1,"Second","Again");

        //db.createNote(n);

        //System.out.println(db.getNotes().toString());

        System.out.println(db.getNoteList());


    }
}
