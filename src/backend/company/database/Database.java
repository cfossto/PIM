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

    getNotes()                  - returns a list of notes from database
    createNote(note)            - creates a note entry in database from a defined Note
    deleteNote(id)              - deletes a note identified by id
    getNoteList()               - returns a list of available lists/groups of notes
    createNoteList(noteList)    - creates a note list/group in database from defined noteList

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
            PreparedStatement stmt1 = conn.prepareStatement("INSERT INTO notes(list_id,title,text,created_at,modified_at) VALUES(?,?,?,?,?)");

            Timestamp created_at = Timestamp.valueOf(LocalDateTime.now());
            Timestamp modified_at = Timestamp.valueOf(LocalDateTime.now());

            stmt1.setInt(1,note.getList_id());
            stmt1.setString(2,note.getTitle());
            stmt1.setString(3,note.getText());
            stmt1.setTimestamp(4,created_at);
            stmt1.setTimestamp(5,modified_at);
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
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO lists(id,name) values (?,?)");
            stmt.setInt(1,noteList.getId());
            stmt.setString(2,noteList.getName());
            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }


    // Delete note from database by ID
    public void deleteNote(int id){
        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM notes WHERE ID = ?");
            stmt.setInt(1,id);
            stmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }


    // Delete note list/group list by id
    public void deleteNoteList(int id){

        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM lists WHERE ID = ?");
            stmt.setInt(1, id);
            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }






}