import * as readline from "readline";

class Link {
    private iData: number;
    public next: Link | undefined;

    public constructor(it: number) {
        this.iData = it;
    }

    public getKey(): number {
        return this.iData;
    }

    public displayLink(): void {
        console.log(this.iData + " ");
    }
}

class SortedList {
    private first: Link | undefined;

    public constructor() {
        this.first = undefined;
    }

    public insert(theLink: Link): void {
        const key: number | undefined = theLink?.getKey();
        let previous: Link | undefined = undefined;
        let current: Link | undefined = this.first;

        while (current && key && key > current.getKey()) {
            previous = current;
            current = current.next;
        }

        if (!previous) {
            this.first = theLink;
        } else {
                previous.next = theLink;
        }

        theLink.next = current;
    }

    public delete(key: number): void {
        let previous: Link | undefined = undefined;
        let current: Link | undefined = this.first;

        while (current && key !== current.getKey()) {
            previous = current;
            current = current.next;
        }

        if (!previous) {
            this.first = this.first?.next;
        } else {
            if (current) {
                previous.next = current.next;
            }
        }
    }

    public find(key: number): Link | undefined {
        let current: Link | undefined = this.first;

        while (current && current.getKey() <= key) {
            if (current.getKey() === key) {
                return current;
            }
            current = current.next;
        }

        return undefined;
    }

    public displayList(): void {
        console.log("List (first-->last): ");
        let current: Link | undefined = this.first;

        while (current) {
            current.displayLink();
            current = current.next;
        }
        console.log("\n");
    }
}

class HashTable {
    private hashArray: SortedList[];
    private arraySize: number;

    public constructor(size: number) {
        this.arraySize = size;
        this.hashArray = [];

        for (let i = 0; i < this.arraySize; ++i) {
            this.hashArray[i] = new SortedList();
        }
    }

    public displayTable(): void {
        for (let i = 0; i < this.arraySize; ++i) {
            console.log(i + ". ");
            this.hashArray[i].displayList();
        }
    }

    public hashFunc(key: number): number {
        return key % this.arraySize;
    }

    public insert(theLink: Link): void {
        const key: number = theLink.getKey();
        const hashVal: number = this.hashFunc(key);
        this.hashArray[hashVal].insert(theLink);
    }

    public delete(key: number): void {
        const hashVal: number = this.hashFunc(key);
        this.hashArray[hashVal].delete(key);
    }

    public find(key: number): Link | undefined {
        const hashVal: number = this.hashFunc(key);
        const theLink: Link | undefined = this.hashArray[hashVal].find(key);

        return theLink;
    }
}

export default class HashChainApp {
    public aDataItem: Link | undefined;
    public aKey: number;
    public size: number;
    public n: number;
    public keysPerCell: number;

    public constructor() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question("Enter size of hash table: ", (sizeInput) => {
            this.size = +sizeInput;

            rl.question("Enter initial number of items: ", (nInput) => {
                this.n = +nInput;

                const theHashTable: HashTable = new HashTable(this.size);

                for (let i = 0; i < this.n; ++i) {
                    this.aKey = Math.random() * 100 * this.size;
                    this.aDataItem = new Link(this.aKey);
                    theHashTable.insert(this.aDataItem);
                }

                while (true) {
                    let choice: string | null = prompt(
                        `Enter first letter of (s)how, (i)nsert, (d)elete, or (f)ind: `,
                    );

                    switch (choice) {
                        case "s":
                            theHashTable.displayTable();
                            break;

                        case "i":
                            rl.question(
                                "Enter key value to insert: ",
                                function (aKeyInput) {
                                    if (aKeyInput) {
                                        this.aKey = +aKeyInput;
                                    } else {
                                        return;
                                    }
                                    this.aDataItem = new Link(this.aKey);
                                    theHashTable.insert(this.aDataItem);
                                },
                            );

                            break;

                        case "d":
                            rl.question(
                                "Enter key value to insert: ",
                                function (aKeyInput) {
                                    if (aKeyInput) {
                                        this.aKey = +aKeyInput;
                                    } else {
                                        return;
                                    }

                                    theHashTable.delete(this.aKey);
                                },
                            );

                            break;

                        case "f":
                            rl.question(
                                "Enter key value to insert: ",
                                function (aKeyInput) {
                                    if (aKeyInput) {
                                        this.aKey = +aKeyInput;
                                    } else {
                                        return;
                                    }

                                    this.aDataItem = theHashTable.find(
                                        this.aKey,
                                    );

                                    if (this.aDataItem) {
                                        console.log("Found " + this.aKey);
                                    } else {
                                        console.log(
                                            "Could not find " + this.aKey,
                                        );
                                    }
                                },
                            );

                            break;

                        default:
                            console.log("Invalid entry\n");
                    }
                }
            });
        });
    }

    public static async getString(): Promise<string> {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        return new Promise((resolve) =>
            rl.question("", (answer) => resolve(answer)),
        );
    }

    public static async getChar(): Promise<string> {
        const s: string = await this.getString();
        return s.charAt(0);
    }

    public static async getInt(): Promise<number> {
        const s: string = await this.getString();
        return +s;
    }
}
