package backend.company.notePack;

import java.io.File;
import java.util.List;

public class Note {

    private int id;
    private String description;
    private String title;

    // List<File> files = new File();


    public Note(int id, String description, String title) {
        this.id = id;
        this.description = description;
        this.title = title;
    }

    public Note(String description, String title) {
        this.description = description;
        this.title = title;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    @Override
    public String toString() {
        return "Note{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", title='" + title + '\'' +
                '}';
    }
}
