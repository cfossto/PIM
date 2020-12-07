package backend.company.database;


import backend.company.notePack.Note;
import backend.company.notePack.NoteList;
import com.fasterxml.jackson.core.JsonProcessingException;
import express.utils.Utils;

import java.sql.*;
import java.util.List;

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
            PreparedStatement stmt1 = conn.prepareStatement("INSERT INTO notes(id,list_id,title,text) VALUES(?,?,?,?)");

            stmt1.setInt(1,note.getId());
            stmt1.setInt(2,note.getList_id());
            stmt1.setString(3,note.getTitle());
            stmt1.setString(4,note.getText());

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

            NoteList[] resultsFromRS = (NoteList[]) Utils.readResultSetToObject(rs,NoteList[].class);

            noteList.add(resultsFromRS);


        } catch (SQLException | JsonProcessingException throwables) {
            throwables.printStackTrace();
        }


    }





}