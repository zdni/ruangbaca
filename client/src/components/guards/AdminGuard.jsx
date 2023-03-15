import { Navigate } from 'react-router-dom'
import { useAppContext } from "../../context/appContext"

export const AdminGuard = ({ children }) => {
  const { isAuthenticated, user} = useAppContext()

  if (isAuthenticated && user && user.role === 'admin') {
    return <>{children}</>
  }
  
  return <Navigate to="/" />
}