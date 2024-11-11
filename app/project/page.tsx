'use client';

import { createClient } from "@/utils/supabase/client";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { column, cell, project, columnType, row } from "./classes";

function getColour(cell: cell, column: column) {
    switch (column.type) {
        case columnType.text:
            return "#000000";
        case columnType.number:
            if (cell.value > column.goodPoint) {
                return "#00FF00";
            }
            else if (cell.value < column.badPoint) {
                return "#FF0000";
            }
            else {
                return "#FFFF00";
            }
        case columnType.rating:
            if (cell.value >= column.goodPoint) {
                return "#00FF00";
            }
            else if (cell.value < column.badPoint) {
                return "#FF0000";
            }
            else {
                return "#FFFF00";
            }
        case columnType.price:
            if (cell.value < column.goodPoint) {
                return "#00FF00";
            }
            else if (cell.value > column.badPoint) {
                return "#FF0000";
            }
            else {
                return "#FFFF00";
            }
        case columnType.boolean:
            if (cell.value == column.goodPoint) {
                return "#00FF00";
            }
            else if (cell.value == column.badPoint) {
                return "#FF0000";
            }
        case columnType.link:
            return "#000000";
    }
}

function getWorth(cell: cell, column: column) {
    switch (column.type) {
        case columnType.text:
            return cell.value;
        case columnType.number:
            if (cell.value > column.goodPoint) {
                return 1;
            }
            else if (cell.value < column.badPoint) {
                return -1;
            }
            else {
                return 0;
            }
        case columnType.rating:
            if (cell.value >= column.goodPoint) {
                return 1;
            }
            else if (cell.value < column.badPoint) {
                return -1;
            }
            else {
                return 0;
            }
        case columnType.price:
            if (cell.value < column.goodPoint) {
                return 1;
            }
            else if (cell.value > column.badPoint) {
                return -1;
            }
            else {
                return 0;
            }
        case columnType.boolean:
            if (cell.value == column.goodPoint) {
                return 1;
            }
            else if (cell.value == column.badPoint) {
                return -1;
            }
        case columnType.link:
            return cell.value;
    }
}

function getTotal(columns: column[], row: row): number {
    let total = 0;
    for (let i = 0; i < row.cells.length; i++) {
        total += row.cells[i].value * columns[i].worth;
    }
    return total;
}

export default function ProjectPageReal() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProjectPage />
        </Suspense>
    )
}

function ProjectPage() {
    const searchParams = useSearchParams();
    const supabase = createClient();


    const [columns, setColumns] = useState<column[]>([]);
    const [user, setUser] = useState<any>();
    const [rows, setRows] = useState<row[]>([]);
    const [projectData, setProjectData] = useState<project>();
    const [loading, setLoading] = useState(true);
    const [columnSelected, setColumnSelected] = useState(-1);
    const [rowSelected, setRowSelected] = useState(-1);

    const projectID = searchParams.get('id');
    // console.log(projectID);

    useEffect(() => {
        async function fetchData() {
            const useri = await supabase.auth.getUser();
            setUser(useri.data.user);
            const { data: projecData } = await supabase.from("Projects").select("*").eq("id", projectID).single();
            setProjectData(new project(projecData.title, projecData.description, projecData.id, projecData.created_by, projecData.created_at, projecData.updated_at));
            const { data } = await supabase.from("Column").select("*").eq("project_id", projectID);
            if (data?.length !== 0) {
                let tempC: column[] = [];
                for (let i = 0; i < data!.length; i++) {
                    tempC.push(new column(data![i].title, data![i].id, data![i].position, data![i].good_point, data![i].bad_point, data![i].type, data![i].worth));
                }
                setColumns(tempC);
                let tempR: row[] = [];
                for (let i = 0; i < tempC.length; i++) {
                    const { data } = await supabase.from("Cell").select("*").eq("column_id", tempC[i].id);
                    let rowIN: cell[] = [];
                    for (let j = 0; j < data!.length; j++) {
                        rowIN.push(new cell(data![j].data, data![j].value));
                    }
                    tempR.push(new row(i, rowIN));
                }
                setRows(tempR);
            }
        }
        fetchData();
        setLoading(false);
    }, []);


    return (
            <div style={{ overflow: 'hidden' }}>
                <div key={"header"} style={{ position: "absolute", top: '0', left: '0', width: '100%', height: '5%', backgroundColor: '#2D2436', display: 'flex', alignItems: 'end', justifyContent: 'start', flexDirection: 'row', gap: '10px', paddingLeft: '5%', paddingRight: '5%', borderBottom: '1px solid rgba(255, 255, 255, 0.5)' }}>
                    <h1>{projectData?.title}</h1>
                </div>

                <div key={"table"} style={{ position: 'absolute', top: '5%', left: '0', display: 'flex', minWidth: '100vw', minHeight: '95vh', backgroundColor: '#2E2B33', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'auto', zIndex: '1' }} >
                    {columns.map((column: column) => (
                        <div key={"row" + column.position} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <div key={"column" + column.position} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} onMouseDown={() => setColumnSelected(-1)}>
                                <input type="text" style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: '#ffffff', fontSize: '1rem', backgroundColor: column.position == columnSelected ? '#00E042' : '#2D2436' }} name={column.id + "title"} defaultValue={column.title} placeholder="title" onClick={() => { setColumnSelected(column.position); setRowSelected(-1) }} onChange={(event) => {
                                    let temp = columns;
                                    temp[column.position].title = event.target.value;
                                    setColumns(temp);
                                }} />
                                {rows.map((row: row) => (
                                    <input key={"row" + row.position + "cell" + column.position} type="text" style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: '#2D2436', display: 'flex', alignItems: 'center', justifyContent: 'start', flexDirection: 'row', backgroundColor: getColour(row.cells[column.position], column) }} name={column.id + "x" + row.position} defaultValue={row.cells[column.position].data} onClick={() => { setColumnSelected(column.position); setRowSelected(row.position) }} onChange={() => {
                                        let temp = [...rows];
                                        temp[row.position].cells[column.position].value = getWorth(row.cells[column.position], column);
                                        setRows(temp);
                                    }}></input>
                                ))}
                                <button style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: '#2D2436' }} onClick={() => {
                                    let newRow: cell[] = [];
                                    for (let i = 0; i < columns.length; i++) {
                                        newRow.push(new cell("", 0));
                                    }
                                    let newRows = [...rows];
                                    newRows.push(new row(newRows.length, newRow));
                                    setRows(newRows);
                                }}>\/+\/</button>

                            </div>
                            {rowSelected !== -1 && columnSelected === column.position ? <form style={{ margin: '20px', backgroundColor: '#2D2436', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.5), z-index: 500' }} >
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'column', marginTop: '16px' }}>
                                    <h4>Value</h4>
                                    <input type="number" min="-1" max="1" step="1" value={rows[rowSelected].cells[column.position].value} onChange={(event) => {
                                        let temp = [...rows];
                                        temp[rowSelected].cells[column.position].value = parseInt(event.target.value);
                                        setRows(temp);
                                    }} />
                                </div>
                            </form> : columnSelected === column.position ?
                                <form style={{ margin: '20px', backgroundColor: '#2D2436', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.5), z-index: 500' }} onClick={() => { console.log("hi") }}>
                                    <h3>{column.title}</h3>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'column', marginTop: '16px' }}>
                                        <h4>Type</h4>

                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'row' }}>
                                            <input readOnly type="radio" name="shortText" id="shortText" checked={column.type === columnType.text} onClick={() => {
                                                let temp = [...columns];
                                                temp[column.position].type = columnType.text;
                                                setColumns(temp);
                                            }} />
                                            <label htmlFor="shortText">Text</label>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'row' }}>
                                            <input readOnly type="radio" name="number" id="number" checked={column.type === columnType.number} onClick={() => {
                                                let temp = [...columns];
                                                temp[column.position].type = columnType.number;
                                                setColumns(temp);
                                            }} />
                                            <label htmlFor="number">Number</label>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'row' }}>
                                            <input readOnly type="radio" name="rating" id="rating" checked={column.type === columnType.rating} onClick={() => {
                                                let temp = [...columns];
                                                temp[column.position].type = columnType.rating;
                                                setColumns(temp);
                                            }} />
                                            <label htmlFor="rating">Rating</label>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'row' }}>
                                            <input readOnly type="radio" name="price" id="price" checked={column.type === columnType.price} onClick={() => {
                                                let temp = [...columns];
                                                temp[column.position].type = columnType.price
                                                setColumns(temp);
                                            }} />
                                            <label htmlFor="price">Price</label>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'row' }}>
                                            <input readOnly type="radio" name="boolean" id="boolean" checked={column.type === columnType.boolean} onClick={() => {
                                                let temp = [...columns];
                                                temp[column.position].type = columnType.boolean;
                                                setColumns(temp);
                                            }} />
                                            <label htmlFor="boolean">Boolean</label>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'row' }}>
                                            <input readOnly type="radio" name="link" id="link" checked={column.type === columnType.link} onClick={() => {
                                                let temp = [...columns];
                                                temp[column.position].type = columnType.link;
                                                setColumns(temp);
                                            }} />
                                            <label htmlFor="link">Link</label>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'column', marginTop: '16px' }}>
                                        <h4>Good Point</h4>
                                        <input type="number" value={column.goodPoint} onChange={(e) => {
                                            let temp = [...columns];
                                            temp[column.position].goodPoint = Number(e.target.value);
                                            setColumns(temp);
                                        }} />
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'column', marginTop: '16px' }}>
                                        <h4>Bad Point</h4>
                                        <input type="number" value={column.badPoint} onChange={(e) => {
                                            let temp = [...columns];
                                            temp[column.position].badPoint = Number(e.target.value);
                                            setColumns(temp);
                                        }} />
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'column', marginTop: '16px' }}>
                                        <h4>Worth</h4>
                                        <input type="number" value={column.worth} onChange={(e) => {
                                            let temp = [...columns];
                                            temp[column.position].worth = Number(e.target.value);
                                            setColumns(temp);
                                        }} />
                                    </div>
                                </form>
                                : <p></p>
                            }
                        </div>
                    ))}
                    <div key={"addColumn"} style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'column', }}>
                        <button style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: '#2D2436' }} onClick={() => {
                            setColumns([...columns, new column("New Column", columns.length, columns.length, 0, 0, 0, 0)]);
                            let temp = rows;
                            for (let i = 0; i < temp.length; i++) {
                                temp[i].cells.push(new cell("", 0));
                            }
                            setRows(temp);
                        }}>{'>\n+\n>'}</button>
                    </div>
                    <div key={"column totoal"} style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} onMouseDown={() => setColumnSelected(-1)}>
                        <p style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: '#ffffff', fontSize: '1rem', backgroundColor: '#2D2436' }}>total</p>
                        {rows.map((row: row) => (
                            <p key={"row" + row.position + "cell total"} style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: '#2D2436', display: 'flex', alignItems: 'center', justifyContent: 'start', flexDirection: 'row' }}>{getTotal(columns, row)}</p>
                        ))}
                    </div>
                </div>
            </div>
    )
}