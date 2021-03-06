package backend.company.notePack;

public class NoteList {

    private int id;
    private String name;


    public NoteList(){}

    public NoteList(int id) {
        this.id = id;
    }

    public NoteList(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public NoteList(String name) {
        this.name = name;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "NoteList{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
