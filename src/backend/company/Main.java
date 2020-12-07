package backend.company;


import backend.company.database.Database;
import backend.company.notePack.Note;
import backend.company.notePack.NoteList;

public class Main {

    public static void main(String[] args) {

        Database db = new Database();

        //Note n = new Note(1,"Second","Again");

        //db.createNote(n);

        //System.out.println(db.getNotes().toString());

        NoteList g = new NoteList("collections");

        db.createNoteList(g);

        System.out.println(db.getNoteList());


    }
}
