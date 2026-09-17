import {
  AuthContext,
  type AuthData,
  type AuthContextParams,
} from "./auth-context"
import { useState, type FC, type PropsWithChildren } from "react"

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [authData, setAuthData] = useState<AuthData | null>(null)

  const authenticate = (input: AuthData) => {
    setIsAuth(true)
    setAuthData(input)
  }

  const logout = () => {
    setIsAuth(false)
    setAuthData(null)
  }

  const value: AuthContextParams = {
    isAuth,
    authData,
    authenticate,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
