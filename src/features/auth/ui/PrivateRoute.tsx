import type { FC, ReactNode } from "react"
import { useAuthContext } from "../model/use-auth-context"
import { Navigate } from "react-router"

interface Props {
  element: ReactNode
}

const PrivateRoute: FC<Props> = ({ element }) => {
  const { isAuth } = useAuthContext()

  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  return element
}

export default PrivateRoute
