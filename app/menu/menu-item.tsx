import { deleteProject, edit } from "./actions"


export default function MenuItem({ title, description, id, created, modified, author }: { title: string, description: string, id: number, created: Date, modified: Date, author: string }) {

    return (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'column', width: '70vw', }}>
            <a href={`/${id}`} style={{ borderRadius: '150px', backgroundColor: '#2D2436', borderWidth: '1px', borderStyle: 'solid', padding: '20px', width: '100%', display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'column', paddingLeft: '5%' }}>
                <h2>{title}</h2>
                <div style={{ display: 'flex', gap: '50px', alignItems: 'center', justifyContent: 'start', flexDirection: 'row', width: '100%', paddingLeft: '5%' }}>
                    <div style={{width: '12%'}}><p>Created:</p><p style={{paddingLeft: '5%', width: '95%'}}>{created.toDateString()}</p></div>
                    <div style={{ width: '12%' }}><p>Edited:</p><p style={{ paddingLeft: '5%', width: '95%' }}>{modified.toDateString()}</p></div>
                    <div style={{ width: '12%' }}><p>Author:</p><p style={{ paddingLeft: '5%', width: '95%' }}>{author}</p></div>
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.5)', paddingLeft: '2%', paddingRight: '2%', width: '96%' }}>{description}</p>

            </a>
            <form style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'center', flexDirection: 'row', width: '100%' }}>
                <button style={{ padding: '10px', backgroundColor: '#2D2436', borderRadius: '20px', width: '10%', color: 'yellow', borderColor: 'yellow', borderWidth: '1px', borderStyle: 'solid' }} formAction={edit}>Edit</button>
                <button style={{ padding: '10px', backgroundColor: '#2D2436', borderRadius: '20px', width: '10%', color: 'red', borderColor: 'red', borderWidth: '1px', borderStyle: 'solid' }} formAction={deleteProject}>Delete</button>
                <input name="id" defaultValue={id} style={{ display: 'none' }} />
            </form>
        </div>
    )
}