package backend.company.files;

public class File {

    private int id;
    private int note_id;
    private int category_id;
    private String name;

    public File (){}

    public File(int id, int note_id, int category_id, String name) {
        this.id = id;
        this.note_id = note_id;
        this.category_id = category_id;
        this.name = name;
    }

    public File(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public File(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getNote_id() {
        return note_id;
    }

    public void setNote_id(int note_id) {
        this.note_id = note_id;
    }

    public int getCategory_id() {
        return category_id;
    }

    public void setCategory_id(int category_id) {
        this.category_id = category_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    @Override
    public String toString() {
        return "File{" +
                "id=" + id +
                ", note_id=" + note_id +
                ", category_id=" + category_id +
                ", name='" + name + '\'' +
                '}'+"\n";
    }
}
