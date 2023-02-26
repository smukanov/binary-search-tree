export type NodeType = BinarySearchNode | null;

export class BinarySearchNode {
    private _data: number; // значение узла
    private _left: NodeType = null; // ссылка на левого потомка
    private _right: NodeType = null; // ссылка на правого потомка

    constructor(data: number){
        this._data = data;
    }

    get data(){
        return this._data;
    }

    get left(){
        return this._left
    }

    get right(){
        return this._right
    }

    set left(value: NodeType){
        this._left = value;
    }

    set right(value: NodeType){
        this._right = value
    }
}