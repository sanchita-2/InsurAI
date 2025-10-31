import java.util.Arrays;
class ArraySorter {
    private int[] array;
    public ArraySorter(int[] array) {
        this.array = array;
    }
    public void bubbleSort() {
        int n = array.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    // Swap array[j] and array[j+1]
                    int temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
    }
    public int[] getSortedArray() {
        return array;
    }
    public void printArray() {
        System.out.println(Arrays.toString(array));
    }
}

public class Sortingoops {
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};

        ArraySorter sorter = new ArraySorter(numbers);

        System.out.print("Original array: ");
        sorter.printArray();

        sorter.bubbleSort();

        System.out.print("Sorted array: ");
        sorter.printArray();

      
        int[] sortedNumbers = sorter.getSortedArray();
        System.out.println("Sorted array (accessed directly): " + Arrays.toString(sortedNumbers));
    }
}
