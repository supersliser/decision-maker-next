export enum columnType {
    shortText,
    longText,
    rating,
    price,
    boolean,
    link
}

export class column {
    title: string;
    id: number;
    position: number;
    goodPoint: number;
    badPoint: number;
    type: columnType;

    public constructor(title: string, id: number, position: number, goodPoint: number, badPoint: number, type: columnType) {
        this.title = title;
        this.id = id;
        this.position = position;
        this.goodPoint = goodPoint;
        this.badPoint = badPoint;
        this.type = type;
    }
}

export class cell {
    columnID: number;
    rowPosition: number;
    data: string;
    value: number;

    public constructor(columnID: number, rowPosition: number, data: string, value: number) {
        this.columnID = columnID;
        this.rowPosition = rowPosition;
        this.data = data;
        this.value = value;
    }
}