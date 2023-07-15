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

    if (getTokenFromCookies()) {
      if (guestUrls.includes(window.location.pathname)) {
        navigate('/todo')
      }
    } else {
      if (!guestUrls.includes(window.location.pathname)) {
        navigate('/login')
      }
    }

    if (!guestUrls.includes('/') && getTokenFromCookies()) {
      navigate('/todo')
    }
  }, [window.location.pathname])

  return children
}
