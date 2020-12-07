package backend.company;


import backend.company.database.Database;

public class Main {

    public static void main(String[] args) {

        Database db = new Database();

        System.out.println(db.getNotes().toString());


    }
}
