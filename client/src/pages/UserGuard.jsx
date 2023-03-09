import { Navigate } from "react-router-dom"
import { useAppContext } from "../context/appContext"

export const UserGuard = ({children}) => {
  const { isAuthenticated } = useAppContext()
  
  if(!isAuthenticated) {
    return <Navigate to='/dashboard' />
  }
  return <>{children}</>
}