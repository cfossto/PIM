package backend.company.database;


import backend.company.notePack.Note;
import backend.company.notePack.NoteList;
import com.fasterxml.jackson.core.JsonProcessingException;
import express.utils.Utils;
import java.sql.*;
import java.time.LocalDateTime;
import java.util.List;


/*
Functionality added for CRUD on notes and list.
Here is the usage:

    -- Notes --
    createNote(note)            - creates a note entry in database from a defined Note
    getNotes()                  - returns a list of notes from database
    updateNote(id, title, body) - updates a note identified with id.
    deleteNote(id)              - deletes a note identified by id

    -- Note groups/lists --
    getNoteList()               - returns a list of available lists/groups of notes
    createNoteList(noteList)    - creates a note list/group in database from defined noteList
    deleteNoteList(id)          - deletes a note list/group by id
    updateListName(id,name)     - updates the name of a list, identified by id


 */




public class Database {

    private Connection conn;



    // Database constructor
    public Database(){

        try {
            conn = DriverManager.getConnection("jdbc:sqlite:pim.db");
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }



    // Gets all information from "notes"-table.
    public List<Note> getNotes(){
        List<Note> notes = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM notes");
            ResultSet rs = stmt.executeQuery();
            Note[] attFromRs = (Note[]) Utils.readResultSetToObject(rs,Note[].class);
            notes = List.of(attFromRs);

        } catch (SQLException | JsonProcessingException throwables) {
            throwables.printStackTrace();
        }
        return notes;
    }




    // Creates input in "notes"-table
    public void createNote(Note note){

        try {
            PreparedStatement stmt1 = conn.prepareStatement("INSERT INTO notes(list_id,title,text,created_at,updated_at) VALUES(?,?,?,?,?)");

            Timestamp created_at = Timestamp.valueOf(LocalDateTime.now());
            Timestamp updated_at = Timestamp.valueOf(LocalDateTime.now());

            stmt1.setInt(1,note.getList_id());
            stmt1.setString(2,note.getTitle());
            stmt1.setString(3,note.getText());
            stmt1.setTimestamp(4,created_at);
            stmt1.setTimestamp(5,updated_at);
            stmt1.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }



    // Gets information from "lists"-table
    public List<NoteList> getNoteList(){

        List<NoteList> noteList = null;

        try {

            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM lists");
            ResultSet rs = stmt.executeQuery();
            NoteList[] resultFromRs = (NoteList[]) Utils.readResultSetToObject(rs, NoteList[].class);
            noteList = List.of(resultFromRs);

        } catch (SQLException | JsonProcessingException throwables) {
            throwables.printStackTrace();
        }
        return noteList;
    }


    // Creates Collection of notes
    public void createNoteList(NoteList noteList){

        List<NoteList> noteLists = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO lists(name) values (?)");
            stmt.setString(1,noteList.getName());
            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }


    // Delete note from database by ID
    public void deleteNote(int id){
        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM notes WHERE id = ?;");
            stmt.setInt(1,id);
            stmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }


    // Delete note list/group list by id
    public void deleteNoteList(int id){

        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM lists WHERE id = ?;");
            stmt.setInt(1, id);
            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }


    // Update listname. Automated "updated at"-timestamp.
    public void updateNotelistName(int id, String name){

        try {

            Timestamp timestamp = Timestamp.valueOf(LocalDateTime.now());

            PreparedStatement stmt = conn.prepareStatement("UPDATE lists SET name = ?, updated_at WHERE id = ?");
            stmt.setString(1,name);
            stmt.setTimestamp(2,timestamp);
            stmt.setInt(3,id);
            stmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }


    // Sort-by-method
    public List <Note> sortNoteBy(String sqlSortArg, String sqlAscDesc){

        List<Note> notes = null;
        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM notes ORDER BY ? ?");
            stmt.setString(1,sqlSortArg);
            stmt.setString(2,sqlAscDesc);

            ResultSet rs = stmt.executeQuery();

            Note[] resultFromRs = (Note[]) Utils.readResultSetToObject(rs,Note[].class);

            notes = List.of(resultFromRs);

        } catch (SQLException | JsonProcessingException throwables) {
            throwables.printStackTrace();
        }
        return notes;
    }


    // Update body of note and returns the new note
    public void updateNote(int id,String title,String body,int list_id){

        try {

            Timestamp timestamp = Timestamp.valueOf(LocalDateTime.now());

            PreparedStatement stmt1 = conn.prepareStatement("UPDATE notes SET title= ?, text = ?, updated_at = ?, list_id = ? WHERE id = ?");
            stmt1.setString(1,title);
            stmt1.setString(2,body);
            stmt1.setTimestamp(3,timestamp);
            stmt1.setInt(4,list_id);
            stmt1.setInt(5,id);

            stmt1.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }


    // dummy data for stupid database sync problem
    public void populate(){
        for (int g = 0; g<20; g++) {

            String ett = "Titel " + String.valueOf(g);
            String tva = "Body " + String.valueOf(g);

            Note n = new Note(ett, tva);
            createNote(n);
        }
    }


}