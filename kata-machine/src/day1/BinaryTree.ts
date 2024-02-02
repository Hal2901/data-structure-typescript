import quick_sort from "./QuickSort";

class BinaryNode<T> {
    key: T;
    value?: any;
    leftChild?: BinaryNode<T>;
    rightChild?: BinaryNode<T>;
    balance: number;

    constructor(key: T, value?: any) {
        this.key = key;
        this.value = value;
        this.leftChild = undefined;
        this.rightChild = undefined;
        this.balance = 0;
    }
}

export default class Binarytree {
    root: BinaryNode<number> | undefined;

    constructor(data: number[]) {
        this.root = this.buildTree(data);
    }

    public buildTree(data: number[]): BinaryNode<number> | undefined {
        if (!data || data.length === 0) return undefined;

        data = Array.from(new Set(data));
        quick_sort(data);

        const mid = Math.floor(data.length / 2);
        const current = new BinaryNode(data[mid]);

        current.leftChild = this.buildTree(data.slice(0, mid));
        current.rightChild = this.buildTree(data.slice(mid + 1));

        return current;
    }

    public prettyPrint(
        head: BinaryNode<number> | undefined,
        prefix: string = "",
        isLeft: boolean = true,
    ) {
        if (head === undefined) return;

        if (head.rightChild) {
            this.prettyPrint(
                head.rightChild,
                `${prefix}${isLeft ? "|   " : "    "}`,
                false,
            );
        }

        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${head.key}`);

        if (head.leftChild) {
            this.prettyPrint(
                head.leftChild,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true,
            );
        }
    }

    public find(key: number): BinaryNode<number> | undefined {
        let current = this.root;

        while (current && current.key !== key) {
            if (key < current.key) {
                current = current.leftChild;
            } else {
                current = current.rightChild;
            }

            if (!current) {
                return undefined;
            }
        }

        return current;
    }

    public getSuccessor(delNode: BinaryNode<number>): BinaryNode<number> {
        let successorParent = delNode;
        let successor = delNode;
        let current = delNode.rightChild;

        while (current) {
            successorParent = successor;
            successor = current;
            current = current.leftChild;
        }

        if (successor !== delNode.rightChild) {
            successorParent.leftChild = successor.rightChild;
            successor.rightChild = delNode.rightChild;
        }

        return successor;
    }

    public delete(key: number): boolean {
        if (!this.root) return false;

        let current: BinaryNode<number> | undefined = this.root;
        let parent = this.root;
        let isLeftChild = true;

        while (current && current.key !== key) {
            parent = current;
            if (key < current.key) {
                isLeftChild = true;
                current = current.leftChild;
            } else {
                isLeftChild = false;
                current = current.rightChild;
            }

            if (!current) {
                return false;
            }
        }

        if (
            current.leftChild === undefined &&
            current.rightChild === undefined
        ) {
            if (current === this.root) {
                this.root = undefined;
            } else if (isLeftChild) {
                parent.leftChild = undefined;
            } else {
                parent.rightChild = undefined;
            }
        }

        if (current.rightChild === undefined) {
            if (current === this.root) {
                this.root = current.leftChild;
            } else if (isLeftChild) {
                parent.leftChild = current.leftChild;
            } else {
                parent.rightChild = current.leftChild;
            }
        }

        if (current.leftChild === undefined) {
            if (current === this.root) {
                this.root = current?.rightChild;
            } else if (isLeftChild) {
                parent.leftChild = current.rightChild;
            } else {
                parent.rightChild = current.rightChild;
            }
        }

        if (current.leftChild && current.rightChild) {
            const successor = this.getSuccessor(current);

            if (current === this.root) {
                this.root = successor;
            } else if (isLeftChild) {
                parent.leftChild = successor;
            } else {
                parent.rightChild = successor;
            }

            successor.leftChild = current.leftChild;
        }

        let ancestor = this.root;
        while (ancestor) {
            this.updateBalance(ancestor);
            ancestor =
                ancestor.leftChild === current
                    ? ancestor.rightChild
                    : ancestor.leftChild;
        }

        return true;
    }

    public insert(key: number): void {
        if (this.find(key)) {
            console.log("Duplicate key");
            return;
        }

        const newNode = new BinaryNode(key);

        if (!this.root) {
            this.root = newNode;
        } else {
            let current: BinaryNode<number> | undefined = this.root;
            let parent;

            while (true) {
                parent = current;
                if (key < current.key) {
                    current = current.leftChild;
                    if (!current) {
                        parent.leftChild = newNode;
                        return;
                    }
                } else {
                    current = current.rightChild;
                    if (!current) {
                        parent.rightChild = newNode;
                        return;
                    }
                }
            }
        }

        let ancestor: BinaryNode<number> | undefined = this.root;
        while (ancestor) {
            this.updateBalance(ancestor);
            ancestor =
                ancestor.leftChild === newNode
                    ? ancestor.rightChild
                    : ancestor.leftChild;
        }
    }

    public inOrder(
        head: BinaryNode<number> | undefined,
        path: number[] = [],
    ): number[] {
        if (!head) {
            return path;
        }
        //pre

        //recurse
        this.inOrder(head.leftChild, path);
        path.push(head.key);
        this.inOrder(head.rightChild, path);
        //post
        return path;
    }

    public preOrder(
        head: BinaryNode<number> | undefined,
        path: number[] = [],
    ): number[] {
        if (!head) {
            return path;
        }
        //pre
        path.push(head.key);
        //recurse
        this.inOrder(head.leftChild, path);
        this.inOrder(head.rightChild, path);
        //post
        return path;
    }

    public postOrder(
        head: BinaryNode<number> | undefined,
        path: number[] = [],
    ): number[] {
        if (!head) {
            return path;
        }
        //pre

        //recurse
        this.inOrder(head.leftChild, path);
        this.inOrder(head.rightChild, path);
        //post
        path.push(head.key);
        return path;
    }

    public levelOrder(
        head: BinaryNode<number> | undefined,
        callBack?: (head: BinaryNode<number>) => void,
    ): BinaryNode<number>[] {
        if (!head) return [];

        let queue = [head];

        while (queue.length) {
            const current = queue.shift() as BinaryNode<number>;

            if (callBack) {
                callBack(current);
            }

            if (current.leftChild) {
                queue.push(current.leftChild);
            }

            if (current.rightChild) {
                queue.push(current.rightChild);
            }
        }

        return queue;
    }

    public height(head: BinaryNode<number> | undefined): number {
        if (!head) return -1;

        if (head.leftChild === undefined && head.rightChild === undefined) {
            return 0;
        }

        let leftHeight = this.height(head.leftChild);
        let rightHeight = this.height(head.rightChild);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    public depth(head: BinaryNode<number> | undefined): number {
        if (!head) return -1;

        let leftDepth = this.depth(head.leftChild);
        let rightDepth = this.depth(head.rightChild);
        return Math.max(leftDepth, rightDepth) + 1;
    }

    public isBalanced(head: BinaryNode<number> | undefined): boolean {
        if (!head) return true;

        let leftHeight = this.height(head.leftChild);
        let rightHeight = this.height(head.rightChild);

        return (
            Math.abs(leftHeight - rightHeight) <= 1 &&
            this.isBalanced(head.leftChild) &&
            this.isBalanced(head.rightChild)
        );
    }

    public updateBalance(head: BinaryNode<number> | undefined): void {
        if (head) {
            let leftHeight = this.height(head.leftChild);
            let rightHeight = this.height(head.rightChild);
            head.balance = leftHeight - rightHeight;
        }
    }

    public rebalance(head: BinaryNode<number>): BinaryNode<number> | undefined {
        if (!head) return undefined;

        let leftHeight = this.height(head.leftChild);
        let rightHeight = this.height(head.rightChild);

        if (this.isBalanced(head)) return head;

        if (leftHeight > rightHeight) {
            if (
                this.height(head.leftChild?.leftChild) >=
                this.height(head.leftChild?.rightChild)
            ) {
                head = this.rotateRight(head);
            } else {
                head.leftChild = this.rotateLeft(head.leftChild);
                head = this.rotateRight(head);
            }
        } else {
            if (
                this.height(head.rightChild?.rightChild) >=
                this.height(head.rightChild?.leftChild)
            ) {
                head = this.rotateLeft(head);
            } else {
                head.rightChild = this.rotateRight(head.rightChild);
                head = this.rotateLeft(head);
            }
        }

        return head;
    }

    private rotateRight(y: BinaryNode<number>): BinaryNode<number> {
        let x = y.leftChild;
        let T2 = x.rightChild;
        x.rightChild = y;
        y.leftChild = T2;
        return x;
    }

    private rotateLeft(x: BinaryNode<number>): BinaryNode<number> {
        let y = x.rightChild;
        let T2 = y.leftChild;
        y.leftChild = x;
        x.rightChild = T2;
        return y;
    }
}
