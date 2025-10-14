import java.util.Scanner;
public class loops1{


    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        System.out.print("Enter number of terms: ");
        int count = in.nextInt();

        int n1 = 0, n2 = 1, n3;

        System.out.print("Fibonacci Series: " + n1 + " " + n2); 

        for (int i = 2; i < count; ++i) { 
            n3 = n1 + n2;
            System.out.print(" " + n3);
            n1 = n2;
            n2 = n3;
        }
        System.out.println(); 
        in.close();
    }
}

