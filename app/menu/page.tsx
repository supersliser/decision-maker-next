import { createClient } from "@/utils/supabase/server";

import MenuItem from "./menu-item"
import { redirect } from 'next/navigation';

export default async function MenuPage() {
    const supabase = await createClient();

    const user = await supabase.auth.getUser();

    const { data } = await supabase.from("Projects").select("*").eq("created_by", user.data.user?.id);

    return (
        <div style={{padding: '1%', paddingLeft: '20%', paddingRight: '20%', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'start', flexDirection: 'column'}}>
            <a style={{ padding: '15px', backgroundColor: '#2D2436', borderRadius: '30px', width: 'fit-content', textAlign: 'center', color: '#00E042', borderColor: '#00E042', borderWidth: '1px', borderStyle: 'solid' }} href={"/new"}>Create Project</a>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'column' }}>
                {data?.map((project: any) => (
                    <MenuItem key={project.id} title={project.title} description={project.description} id={project.id} modified={new Date(project.modified_at)} created={new Date(project.created_at)} author={user.data.user?.email!} />
                ))}
            </div>
        </div>    )
}