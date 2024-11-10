'use client';

import { createClient } from "@/utils/supabase/client";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { column, cell } from "./classes";

export default function ProjectPage() {
    const searchParams = useSearchParams();
    const supabase = createClient();


    const [columns, setColumns] = useState<column[]>([]);
    const [user, setUser] = useState<any>();
    const [rows, setRows] = useState<cell[][]>([]);
    const [projectData, setProjectData] = useState<any>();
    const [loading, setLoading] = useState(true);

    const projectID = searchParams.get('id');
    console.log(projectID);

    useEffect(() => {
        async function fetchData() {
            const useri = await supabase.auth.getUser();
            setUser(useri.data.user);
            const { data: projecData } = await supabase.from("Projects").select("*").eq("id", projectID);
            setProjectData(projecData);
            const { data } = await supabase.from("Column").select("*").eq("project_id", projectID);
            if (data !== null) {
                let tempC: column[] = [];
                for (let i = 0; i < data!.length; i++) {
                    tempC.push(new column(data![i].title, data![i].id, data![i].position, data![i].good_point, data![i].bad_point, data![i].type));
                }
                setColumns(tempC);
                let tempR: cell[][] = [];
                for (let i = 0; i < tempC.length; i++) {
                    const { data } = await supabase.from("Cell").select("*").eq("column_id", tempC[i].id);
                    let row: cell[] = [];
                    for (let j = 0; j < data!.length; j++) {
                        row.push(new cell(data![j].column_id, data![j].row_position, data![j].data, data![j].value));
                    }
                    tempR.push(row);
                }
                setRows(tempR);
                console.log(rows);
                console.log(columns);
            }
            console.log(user);
            console.log(projectData);
        }
        fetchData();
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        );
    }


    return (
        <div style={{ overflow: 'hidden' }}>
            <div style={{ position: "absolute", top: '0', left: '0', width: '100%', height: '5%', backgroundColor: '#2D2436', display: 'flex', alignItems: 'end', justifyContent: 'start', flexDirection: 'row', gap: '10px', paddingLeft: '5%', paddingRight: '5%', borderBottom: '1px solid rgba(255, 255, 255, 0.5)' }}>
                <h1>{projectData == null ? "Project" : projectData.title}</h1>
            </div>

            <div>
                {columns.map((column: column) => (
                    <div>
                        {rows[column.position].map((cell: cell) => (
                            <input type="text" style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: '#2D2436' }} name={cell.columnID + "x" + cell.rowPosition} value={cell.data}></input>
                        ))}
                        <button style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: '#2D2436' }} onClick={() => {
                            setRows([...rows, [new cell(column.id, rows[column.position].length, '', 0)]]);
                        }}>addRow</button>
                    </div>
                ))}
            </div>
        </div>
    )
}