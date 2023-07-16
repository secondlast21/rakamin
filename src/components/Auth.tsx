import { getTokenFromCookies } from '../utils/tokenManager'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface RequireAuthProps {
  children: JSX.Element
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const navigate = useNavigate()

  useEffect(() => {
    const guestUrls = ['/login', '/register']
    const currentPath = window.location.pathname

    if (getTokenFromCookies()) {
      if (currentPath === '/login' || currentPath === '/register') {
        navigate('/dashboard')
      }
    } else {
      if (!guestUrls.includes(currentPath)) {
        navigate('/login')
      }
    }

    if ((!guestUrls.includes('/login') || !guestUrls.includes('/register')) && getTokenFromCookies()) {
      navigate('/todo')
    }
  }, [window.location.pathname])

  return children
}
