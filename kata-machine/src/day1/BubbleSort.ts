export default function bubble_sort(arr: number[]): void {
    // let l = arr.length;
    // do {
    //     for (let i = 0; i < l; ++i) {
    //         if (arr[i] > arr[i + 1]) {
    //             let tmp = arr[i];
    //             arr[i] = arr[i + 1];
    //             arr[i + 1] = tmp;
    //         }
    //     }
    //     l -= 1;
    // } while (l !== 1);

    for (let i = 0; arr.length; ++i) {
        for (let j = 0; j < arr.length - 1 - i; ++j) {
            if (arr[i] > arr[i + 1]) {
                const tmp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = tmp;
            }
        }
    }
}
