import { createContext } from "react"

export type AuthData = {
  idInstance: string
  apiTokenInstance: string
}

export type AuthContextParams = {
  isAuth: boolean
  authData: AuthData | null
  authenticate: (authData: AuthData) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextParams | null>(null)
