package backend.company.notePack;



public class Note {

    private int id;
    private int list_id;
    private String title;
    private String text;


    public Note(int id, int list_id, String title, String text) {
        this.id = id;
        this.list_id = list_id;
        this.title = title;
        this.text = text;
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


    @Override
    public String toString() {
        return "Note{" +
                "id=" + id +
                ", list_id=" + list_id +
                ", title='" + title + '\'' +
                ", text='" + text + '\'' +
                '}';
    }
}