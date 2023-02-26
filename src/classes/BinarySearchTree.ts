import { BinarySearchNode } from "./BinarySearchNode";

export class BinarySearchTree {
    private _root: BinarySearchNode | null = null;

    // добавляет нового потомка в дерево
    insert(value: number): void {
        const newNode = new BinarySearchNode(value);
        if (this._root === null) {
            this._root = newNode;
        } else {
            this.insertNode(this._root, newNode);
        }
    }

    // преобразовывает бинарное дерево в объект, где в свойстве 'name' находится значение узла, а в свойстве 'children' его потомки
    convertToChildren(): any {
        if (this._root === null){
            return null
        }

        return this.visitNode(this._root)
    }

    // рекурсивный метод
    private insertNode(node:BinarySearchNode, newNode:BinarySearchNode): void {
        if (newNode.data < node.data) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    // рекурсивный метод
    private visitNode(node: BinarySearchNode): any {
        const currentNodeValue = node.data;
        const leftChildValue = node.left?.data;
        const rightChildValue = node.right?.data;

        // проверяем, есть ли потомки или нет
        const hasLeftChildren = leftChildValue !== undefined
        const hasRightChildren = rightChildValue !== undefined
        const hasNoChildren = !hasLeftChildren && !hasRightChildren
        const hasBothChildren = hasLeftChildren && hasRightChildren
        
        if (hasNoChildren){
            return {
                name: currentNodeValue
            }
        }
        else if (hasBothChildren){
            return {
                name: currentNodeValue,
                children: [
                    this.visitNode(node.left!),
                    this.visitNode(node.right!)
                ],
            }
        }
        else if (hasLeftChildren){
            return {
                name: currentNodeValue,
                children: [
                    this.visitNode(node.left!)
                ]
            }
        }
        else if (hasRightChildren){
            return {
                name: currentNodeValue,
                children: [
                    this.visitNode(node.right!)
                ]
            }
        }
    }
}