
import { createClient } from "@/utils/supabase/server";
import { update, cancel, deleteProject } from "./actions";


export default async function EditPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const id = (await searchParams).id;

    const supabase = await createClient();

    const { data } = await supabase.from("Projects").select("*").eq("id", id);

    console.log(data);
    return (
        <div>
            <form style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100vw', height: '100vh' }}>
                <input type="hidden" name="id" value={id} />
                <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'column', }}>
                    <h3>Title</h3>
                    <input defaultValue={data![0].title} style={{ padding: '10px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '15px', backgroundColor: '#2D2436', borderWidth: '1px', borderStyle: 'solid' }} id="title" name="title" type="text" required />
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'column' }}>
                    <h3>Description</h3>
                    <input defaultValue={data![0].description} style={{ padding: '10px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '15px', backgroundColor: '#2D2436', borderWidth: '1px', borderStyle: 'solid' }} id="description" name="description" type="text" required />
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'row' }}>
                    <button style={{ padding: '10px', backgroundColor: '#473061', borderRadius: '20px', minWidth: '20%', color: '#00E042', borderColor: '#00E042', borderWidth: '1px', borderStyle: 'solid' }} type="submit" formAction={update}>Update</button>
                    <button style={{ padding: '10px', backgroundColor: '#473061', borderRadius: '20px', minWidth: '20%', color: '#E08400', borderColor: '#E08400', borderWidth: '1px', borderStyle: 'solid' }} formAction={cancel}>Cancel</button>
                    <button style={{ padding: '10px', backgroundColor: '#473061', borderRadius: '20px', minWidth: '20%', color: '#FF0000', borderColor: '#FF0000', borderWidth: '1px', borderStyle: 'solid' }} formAction={deleteProject}>Delete</button>
                </div>
            </form>
        </div>
    )
}