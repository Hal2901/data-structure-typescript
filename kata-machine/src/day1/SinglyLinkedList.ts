type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class SinglyLinkedList<T> {
    public length: number;
    public head?: Node<T>;
    public tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head = node;
    }
    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error("out of bound");
        }

        if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }

        this.length++;

        const curr = this.getAt(idx) as Node<T>;
        const prev = this.getAt(idx - 1) as Node<T>;
        const node = { value: item } as Node<T>;

        node.next = curr;

        if (prev) {
            prev.next = node;
        }
    }
    append(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;
        if (!this.tail) {
            this.head = this.tail = node;
        }

        this.tail.next = node;
        this.tail = node;
    }
    remove(item: T): T | undefined {
        let curr = this.head;
        let idx = 0;
        for (let i = 0; curr && i < this.length; ++i) {
            if (curr.value === item) {
                break;
            }
            curr = curr.next;
            idx = i;
        }

        if (!curr) {
            return;
        }

        return this.removeNode(curr, idx);
    }
    get(idx: number): T | undefined {
        const curr = this.getAt(idx) as Node<T>;
        return curr?.value;
    }
    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);

        if (!node) {
            return undefined;
        }

        return this.removeNode(node, idx);
    }

    removeNode(node: Node<T>, idx: number): T | undefined {
        this.length--;

        if (this.length === 0) {
            const out = this.head?.value;
            this.head = this.tail = undefined;
            return out;
        }

        const prevNode = this.getAt(idx - 1) as Node<T>;
        if (prevNode) {
            prevNode.next = node.next;
        }

        if (node === this.head) {
            this.head = node.next;
        }

        if (node === this.tail) {
            const prevTail = this.getAt(this.length - 1) as Node<T>;
            this.tail = prevTail;
        }

        node.next = undefined;
        return node.value;
    }

    getAt(idx: number): Node<T> | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < idx; ++i) {
            curr = curr.next;
        }

        return curr;
    }
}
