class DataItem<T> {
    private key: T;

    constructor(key: T) {
        this.key = key;
    }

    setKey(key: T) {
        this.key = key;
    }

    getKey(): T {
        return this.key;
    }
}

function isPrime(n: number): boolean {
    if (n <= 1) return false;
    if (n <= 3) return true;

    if (n % 2 === 0 || n % 3 === 0) return false;

    for (let i = 5; i * i <= n; i = i + 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }

    return true;
}

function prevPrime(n: number): number {
    for (let i = n - 1; i > 0; --i) {
        if (isPrime(i)) {
            return i;
        }
    }
    return n;
}

function nextPrime(n: number): number {
    if (n <= 1) return 2;

    let prime = n;
    let isFound = false;
    while (!isFound) {
        prime++;
        if (isPrime(prime)) {
            isFound = true;
        }
    }

    return prime;
}

export default class HashMapOpen {
    private tableLength: number;
    private table: DataItem<string | null>[];
    private primeNumber: number;

    constructor() {
        this.tableLength = 11;
        this.primeNumber = prevPrime(11);
        this.table = [];
    }

    public displayTable(): void {
        console.log("Table: ");
        for (let i = 0; i < this.tableLength; ++i) {
            if (this.table[i]) {
                console.log(`${i}: ${this.table[i].getKey()}`);
            } else {
                console.log(`${i}: **`);
            }
            console.log("\n");
        }
        console.log(this.tableLength);
    }

    hash(key: string): number {
        let hashCode = 0;
        for (let i = 0; i < key.length; ++i) {
            hashCode = 13 * hashCode + key.charCodeAt(i);
        }

        return hashCode % this.tableLength;
    }

    hashStep(key: string): number {
        return this.primeNumber - (this.hash(key) % this.primeNumber);
    }

    set(key: string): void {
        const loadFactor = this.getLength() / this.tableLength;
        if (loadFactor >= 0.75) {
            this.tableLength = nextPrime(this.tableLength);
            this.primeNumber = prevPrime(this.tableLength);

            const tempTable = this.table;
            this.table = [];
            for (let i = 0; i < tempTable.length; ++i) {
                if (tempTable[i]) {
                    const value = tempTable[i].getKey();
                    if (value) {
                        this.set(value);
                    }
                }
            }
        }

        let index = this.hash(key);
        const step = this.hashStep(key);

        if (!this.table[index]) {
            this.table[index] = new DataItem(key);
            return;
        } else {
            while (this.table[index] && this.table[index].getKey()) {
                index += step;
                index %= this.tableLength;
            }
            this.table[index] = new DataItem(key);
        }
    }

    get(key: string): [index: number, key: string | null] | null {
        let index = this.hash(key);
        const step = this.hashStep(key);

        while (this.table[index]) {
            if (this.table[index].getKey() === key) {
                return [index, this.table[index].getKey()];
            }

            index += step;
            index %= this.tableLength;
        }

        return null;
    }

    has(key: string): boolean {
        let index = this.hash(key);
        const step = this.hashStep(key);

        while (this.table[index]) {
            if (this.table[index].getKey() === key) {
                return true;
            }

            index += step;
            index %= this.tableLength;
        }

        return false;
    }

    remove(key: string): boolean {
        let index = this.hash(key);
        const step = this.hashStep(key);

        while (this.table[index]) {
            if (this.table[index].getKey() === key) {
                const temp: DataItem<string | null> = this.table[index];
                this.table[index].setKey(null);
                return true;
            }

            index += step;
            index %= this.tableLength;
        }
        return false;
    }

    getLength(): number {
        let length = 0;
        for (let i = 0; i < this.tableLength; ++i) {
            if (this.table[i] && this.table[i].getKey() !== null) {
                length += 1;
            }
        }
        return length;
    }

    clear(): void {
        for (let i = 0; i < this.tableLength; ++i) {
            if (this.table[i]) {
                this.table[i].setKey(null);
            }
        }
    }

    keys(): string[] {
        let keysArr: string[] = [];
        for (let i = 0; i < this.tableLength; ++i) {
            if (this.table[i] && this.table[i].getKey() !== null) {
                const key = this.table[i].getKey();
                if (key) {
                    keysArr.push(key);
                }
            }
        }
        return keysArr;
    }

    entries(): [index: number, key: string][] {
        let entriesArr: [index: number, key: string][] = [];
        for (let i = 0; i < this.tableLength; ++i) {
            if (this.table[i] && this.table[i].getKey() !== null) {
                const key = this.table[i].getKey();
                if (key) {
                    entriesArr.push([i, key]);
                }
            }
        }
        return entriesArr;
    }
}
