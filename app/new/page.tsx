
import { redirect } from 'next/navigation'
import { create, cancel } from "./action"


export default function EditPage() {
    return (
        <div>
            <form style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100vw', height: '100vh' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'column' }}>
                    <h3>Title</h3>
                    <input style={{ padding: '10px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '15px', backgroundColor: '#2D2436', borderWidth: '1px', borderStyle: 'solid' }} id="title" name="title" type="text" />
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'column' }}>
                    <h3>Description</h3>
                    <input style={{ padding: '10px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '15px', backgroundColor: '#2D2436', borderWidth: '1px', borderStyle: 'solid' }} id="description" name="description" type="text" />
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'row' }}>
                    <button style={{ padding: '10px', backgroundColor: '#2D2436', borderRadius: '20px', width: 'fit-content', color: '#00E042', borderColor: '#00E042', borderWidth: '1px', borderStyle: 'solid' }} type='submit' formAction={create}>Create</button>
                    <button style={{ padding: '10px', backgroundColor: '#2D2436', borderRadius: '20px', width: 'fit-content', color: '#E08400', borderColor: '#E08400', borderWidth: '1px', borderStyle: 'solid' }} formAction={cancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}