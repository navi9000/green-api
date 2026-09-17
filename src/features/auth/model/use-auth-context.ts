import { use } from "react"
import { AuthContext } from "./auth-context"

export function useAuthContext() {
  const context = use(AuthContext)
  if (!context) {
    throw new Error("useAuthContext must be under AuthProvider")
  }
  return context
}
