import { Navigate } from 'react-router-dom'
import { useAppContext } from "../../context/appContext"

export const UserGuard = ({ children }) => {
  const { isAuthenticated, user } = useAppContext()

  if (isAuthenticated && user) {
    return <>{children}</>
  }
  
  return <Navigate to="/" />
}