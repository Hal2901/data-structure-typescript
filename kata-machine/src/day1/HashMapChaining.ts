import SinglyLinkedList from "./SinglyLinkedList";

type HashPair = {
    key: string;
    value: string;
};

class NewSinglyLinkedList extends SinglyLinkedList<HashPair> {
    has(key: string): number {
        let curr = this.head;
        let idx = 0;
        for (let i = 0; curr && i < this.length; ++i) {
            idx = i;
            if (curr.value.key === key) {
                break;
            }
            curr = curr.next;
        }

        if (!curr) {
            return -1;
        }

        return idx;
    }
    removeAll(): void {
        let curr = this.head;
        while (this.length > 0) {
            if (curr) {
                const temp = curr.next;
                this.removeNode(curr, 0);
                curr = temp;
            }
        }
    }
}

export default class HashMapChaining {
    public length: number;
    public bucket: NewSinglyLinkedList[];

    constructor() {
        this.length = 16;
        this.bucket = [];
    }

    hash(key: string): number {
        let hashCode = 0;
        for (let i = 0; i < key.length; ++i) {
            hashCode = 13 * hashCode + key.charCodeAt(i);
        }
        return hashCode % this.length;
    }

    set(key: string, value: string): void {
        const index = this.hash(key);
        const pair = { key: key, value: value } as HashPair;

        if (!this.bucket[index]) {
            this.bucket[index] = new NewSinglyLinkedList();
        }

        const idx = this.bucket[index].has(key);

        if (idx !== -1) {
            this.bucket[index].removeAt(idx);
            this.bucket[index].insertAt(pair, idx);
            return;
        }

        this.bucket[index].prepend(pair);
        return;
    }

    get(key: string): string | undefined {
        const keyNumber = this.hash(key);
        const index = keyNumber % this.length;

        if (!this.bucket[index]) {
            return undefined;
        }

        const idx = this.bucket[index].has(key);

        if (idx !== -1) {
            const value = this.bucket[index].get(idx);
            return value?.value;
        }

        return undefined;
    }

    has(key: string): boolean {
        const keyNumber = this.hash(key);
        const index = keyNumber % this.length;

        if (!this.bucket[index]) {
            return false;
        }

        const idx = this.bucket[index].has(key);

        if (idx !== -1) {
            return true;
        }

        return false;
    }

    remove(key: string): boolean {
        const keyNumber = this.hash(key);
        const index = keyNumber % this.length;

        if (!this.bucket[index]) {
            return false;
        }

        const idx = this.bucket[index].has(key);

        if (idx !== -1) {
            this.bucket[index].removeAt(idx);
            return true;
        }

        return false;
    }

    getLength(): number {
        let length = 0;

        for (let i = 0; i < this.length; ++i) {
            if (!this.bucket[i]) {
                continue;
            }
            length += this.bucket[i].length;
        }
        return length;
    }

    clear(): void {
        for (let i = 0; i < this.length; ++i) {
            if (!this.bucket[i] || this.bucket[i].length === 0) {
                continue;
            }
            this.bucket[i].removeAll();
        }
    }

    keys(): string[] {
        const keyArr: string[] = [];
        for (let i = 0; i < this.length; ++i) {
            if (!this.bucket[i]) {
                continue;
            }
            for (let j = 0; j < this.bucket[i].length; ++j) {
                const item = this.bucket[i].get(j);
                if (item) {
                    keyArr.push(item.key);
                }
            }
        }
        return keyArr;
    }

    values(): string[] {
        const valueArr: string[] = [];
        for (let i = 0; i < this.length; ++i) {
            if (!this.bucket[i]) {
                continue;
            }
            for (let j = 0; j < this.bucket[i].length; ++j) {
                const item = this.bucket[i].get(j);
                if (item) {
                    valueArr.push(item.value);
                }
            }
        }
        return valueArr;
    }

    entries(): [key: string, value: string][] {
        const entriesArr: [key: string, value: string][] = [];
        for (let i = 0; i < this.length; ++i) {
            if (!this.bucket[i]) {
                continue;
            }
            for (let j = 0; j < this.bucket[i].length; ++j) {
                const item = this.bucket[i].get(j);
                if (item) {
                    entriesArr.push([item.key, item.value]);
                }
            }
        }
        return entriesArr;
    }
}
