import { createContext, useContext, useState } from "react";

const defaultAuthContext = {
  authenticated: false,
  username: null,
  password: null,
}

const AuthContext = createContext(defaultAuthContext)
AuthContext.displayName = 'AuthContext'

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  return (
    <AuthContext.Provider
      value={{
        username,
        password,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}