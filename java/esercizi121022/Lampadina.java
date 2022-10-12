public class Lampadina {
   
    private int contatore = 0;
    private String[] situazioni = {"spenta","accesa","rotta"};
    private String stato;

    public Lampadina(){
        this.stato = situazioni[0];
        System.out.println("La lampadina adesso è " + this.stato);
        System.out.println("Dopo 10 click la lampadina si rompe");
    }

    public int getContatore() {
        return contatore;
    }

    public String getStato(){
        return stato;
    }

    public void click(){
        contatore++;
        if(contatore>=10){
            this.stato = situazioni[2];
            System.out.println("La lampadina adesso è " + this.stato);
        } else {
            if((this.stato).equals(situazioni[0])){
                this.stato = situazioni[1];
                System.out.println("Adesso la lampadina è " + this.stato);
            } else {
                this.stato = situazioni[0];
                System.out.println("Adesso la lampadina è " + this.stato);
            }
        }
    }




    
}
