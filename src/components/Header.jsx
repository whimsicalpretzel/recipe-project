import { Link } from 'react-router-dom'
import { User } from './User.jsx'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'

export function Header() {
  const [token, setToken] = useAuth()
  if (token) {
    const { sub } = jwtDecode(token)
    return (
      <div className='header-logged-in'>
        <h1>Recipe Share</h1>
        Logged in as <User id={sub} />
        <button onClick={() => setToken(null)}>Logout</button>
      </div>
    )
  }
  return (
    <div className='header-default'>
      <h1>Recipe Share</h1>
      <div className='login-links'>
        <Link to='/login'>Log In</Link> | <Link to='/signup'>Sign Up</Link>
      </div>
    </div>
  )
}
