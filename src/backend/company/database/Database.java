package backend.company.database;


import backend.company.files.File;
import backend.company.notePack.Note;
import backend.company.notePack.NoteList;
import com.fasterxml.jackson.core.JsonProcessingException;
import express.utils.Utils;
import org.apache.commons.fileupload.FileItem;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    -- Files --
    uploadImage()               - uploads a image to file system
    getFiles()                  - return a list of files
    getFileById()               - returns a file by id
    deleteFile()                - deletes a file by id

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

            PreparedStatement stmt = conn.prepareStatement("UPDATE lists SET name = ? WHERE id = ?");
            stmt.setString(1,name);
            stmt.setInt(2,id);
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
    public void updateNote(int id,String title,int list_id ,String body){

        try {

            Timestamp timestamp = Timestamp.valueOf(LocalDateTime.now());

            PreparedStatement stmt1 = conn.prepareStatement("UPDATE notes SET title= ?, text = ?, list_id = ?, updated_at = ? WHERE id = ?");
            stmt1.setString(1,title);
            stmt1.setString(2,body);
            stmt1.setInt(3,list_id);
            stmt1.setTimestamp(4,timestamp);
            stmt1.setInt(5,id);
            stmt1.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    // Add file in uploads
    public String uploadImage(FileItem image) {
        String imageUrl = "/uploads/" + image.getName();

        try (var os = new FileOutputStream(Paths.get("src/frontend/www" + imageUrl).toString())) {
            os.write(image.get());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return imageUrl;
    }

    // Creates input in "files"-table
    public void createFile(File file){

        try {
            PreparedStatement stmt1 = conn.prepareStatement("INSERT INTO files(note_id,category_id,name) VALUES(?,?,?)");

            stmt1.setInt(1,file.getNote_id());
            stmt1.setInt(2,file.getCategory_id());
            stmt1.setString(3,file.getName());
            stmt1.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    // Gets all information from "files"-table.
    public List<File> getFiles(){
        List<File> files = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM files");
            ResultSet rs = stmt.executeQuery();
            File[] attFromRs = (File[]) Utils.readResultSetToObject(rs,File[].class);
            files = List.of(attFromRs);

        } catch (SQLException | JsonProcessingException throwables) {
            throwables.printStackTrace();
        }
        return files;
    }

    // Gets file by id
    public File getFileById(int id) {
        File file = null;
        String query = "SELECT * FROM Files WHERE id = ?";
        try {
            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setInt(1, id);
            ResultSet resultSet = stmt.executeQuery();

            while (resultSet.next()) {
                int fileId = resultSet.getInt("id");
                int fileNoteId = resultSet.getInt("note_id");
                int fileCategoryId = resultSet.getInt("category_id");
                String fileName = resultSet.getString("name");
                file = new File(fileId, fileNoteId, fileCategoryId, fileName);
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
        return file;
    }

    // Delete file
    public void deleteFile(int id){

        File file = getFileById(id);
        String filepath = file.getName();
        Path fullFilePath = Path.of("src/frontend/www" + filepath);

        try {
            Files.deleteIfExists(fullFilePath);
        }
        catch (IOException e) {
            e.printStackTrace();
        }

        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM files WHERE id = ?");
            stmt.setInt(1, id);
            stmt.executeUpdate();
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