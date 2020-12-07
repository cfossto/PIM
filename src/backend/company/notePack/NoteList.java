package backend.company.notePack;

import java.util.List;

public class NoteList {
    private int id;
    private String title;
    private String description;
    private List<Note> notes = null;

    public NoteList() {
    }

    public NoteList(int id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;

    }

    public NoteList(int id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public List<Note> getNotes() {
        return notes;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }

    @Override
    public String toString() {
        return "NoteList{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", notes=" + notes +
                '}';
    }
}
