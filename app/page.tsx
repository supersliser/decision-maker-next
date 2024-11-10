import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form style={{ width: '500px', display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'column' }}>
          <label htmlFor="email">Email:</label>
          <input style={{ padding: '10px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '15px', backgroundColor: '#2D2436', borderWidth: '1px', borderStyle: 'solid' }} id="email" name="email" type="email" required />
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'start', justifyContent: 'start', flexDirection: 'column' }}>
          <label htmlFor="password">Password:</label>
          <input style={{ padding: '10px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '15px', backgroundColor: '#2D2436', borderWidth: '1px', borderStyle: 'solid'}} id="password" name="password" type="password" required />
        </div>
        <button style={{ padding: '10px', backgroundColor: '#473061', borderRadius: '20px', minWidth: '20%'}} formAction={login}>Log in</button>
        <button style={{ padding: '10px', backgroundColor: '#473061', borderRadius: '20px', minWidth: '20%'}} formAction={signup}>Sign up</button>
      </form>
    </div>
  )
}