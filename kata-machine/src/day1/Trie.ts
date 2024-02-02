export default class Trie {
    public root: Node;

    constructor() {
        this.root = new Node("");
    }

    insert(item: string): void {
        let currentNode = this.root;
        for (let char of item) {
            if (!currentNode.children[char]) {
                currentNode.children[char] = new Node(char);
            }
            currentNode = currentNode.children[char];
        }
        currentNode.isEndOfWord = true;
    }

    delete(item: string): void {
        this.deleteRecursive(this.root, item, 0);
    }

    find(partial: string): string[] {
        let currentNode = this.root;
        for (let char of partial) {
            if (!currentNode.children[char]) {
                return [];
            }
            currentNode = currentNode.children[char];
        }
        return this.getAllWords(currentNode, partial);
    }

    private deleteRecursive(
        currentNode: Node,
        item: string,
        index: number,
    ): boolean {
        if (index === item.length) {
            if (!currentNode.isEndOfWord) {
                return false;
            }
            currentNode.isEndOfWord = false;
            return Object.keys(currentNode.children).length === 0;
        }
        let char = item[index];
        if (!currentNode.children[char]) {
            return false;
        }
        let shouldDeleteCurrentNode = this.deleteRecursive(
            currentNode.children[char],
            item,
            index + 1,
        );
        if (shouldDeleteCurrentNode) {
            delete currentNode.children[char];
            return Object.keys(currentNode.children).length === 0;
        }
        return false;
    }

    private getAllWords(currentNode: Node, prefix: string): string[] {
        let words: string[] = [];
        if (currentNode.isEndOfWord) {
            words.push(prefix);
        }
        for (let char in currentNode.children) {
            words = words.concat(
                this.getAllWords(currentNode.children[char], prefix + char),
            );
        }
        return words;
    }
}

class Node {
    children: { [key: string]: Node };
    isEndOfWord: boolean;

    constructor(char: string) {
        this.children = {};
        this.isEndOfWord = false;
    }
}
