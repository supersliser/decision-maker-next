export enum columnType {
    text,
    number,
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
    worth: number;

    public constructor(title: string, id: number, position: number, goodPoint: number, badPoint: number, type: columnType, worth: number) {
        this.title = title;
        this.id = id;
        this.position = position;
        this.goodPoint = goodPoint;
        this.badPoint = badPoint;
        this.type = type;
        this.worth = worth;
    }
}

export class cell {
    data: string;
    value: number;

    public constructor(data: string, value: number) {
        this.data = data;
        this.value = value;
    }
}

export class project {
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    created_by: string;

    public constructor(id: number, title: string, description: string, created_at: string, updated_at: string, created_by: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.created_by = created_by;
    }
}

export class row {
    position: number;
    cells: cell[];
    total: number;

    public constructor(position: number, cells: cell[], totals: number) {
        this.position = position;
        this.cells = cells;
        this.total = totals;
    }
}