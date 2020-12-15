package backend.company.notePack;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;


public class Note {

    private int id;
    private int list_id;
    private String title;
    private String text;
    private Timestamp created_at;
    private Timestamp updated_at;


    public Note(){}

    public Note(int id) {
        this.id = id;
    }

    public Note(int list_id, String title, String text, Timestamp created_at, Timestamp updated_at_at) {
        this.list_id = list_id;
        this.title = title;
        this.text = text;
        this.created_at = Timestamp.valueOf(LocalDateTime.now());
        this.updated_at = Timestamp.valueOf(LocalDateTime.now());
    }

    public Note(int id, int list_id, String title, String text) {
        this.id = id;
        this.list_id = list_id;
        this.title = title;
        this.text = text;
    }

    public Note(int list_id, String title, String text) {
        this.list_id = list_id;
        this.title = title;
        this.text = text;
    }

    public Note(String title, String text) {
        this.title = title;
        this.text = text;
        list_id = 1;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getList_id() {
        return list_id;
    }

    public void setList_id(int list_id) {
        this.list_id = list_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Timestamp getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }

    public Timestamp getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(Timestamp updated_at) {
        this.updated_at = updated_at;
    }


    @Override
    public String toString() {
        return "Note{" +
                "id=" + id +
                ", list_id=" + list_id +
                ", title='" + title + '\'' +
                ", text='" + text + '\'' +
                ", created_at=" + created_at +
                ", modified_at=" + updated_at +
                '}' + '\n';
    }
}