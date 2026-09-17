import { createBrowserRouter, RouterProvider } from "react-router"
import type { FC } from "react"

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Main Page</div>,
  },
  {
    path: "/login",
    element: <div>Login Page</div>,
  },
  {
    path: "*",
    element: <div>Not found page</div>,
  },
])

const Routes: FC = () => {
  return <RouterProvider router={router} />
}

export default Routes
