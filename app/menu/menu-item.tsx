export default function MenuItem({title, description, id, modified, author} : {title: string, description: string, id: number, modified: Date, author: string}) {

    return (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'column' }}>
            <h3>{title}</h3>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'row' }}>
                <p>Edited: {modified.toDateString()}</p>
                <p>Author: {author}</p>
            </div>
            <p>{description}</p>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'row' }}>
                <button style={{ padding: '10px', backgroundColor: '#473061', borderRadius: '20px', minWidth: '20%'}} onPress={}>Edit</button>
                <button style={{ padding: '10px', backgroundColor: '#473061', borderRadius: '20px', minWidth: '20%'}} formAction={delete}>Delete</button>
            </div>
        </div>
    )
}