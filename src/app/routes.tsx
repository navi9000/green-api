import { createBrowserRouter, RouterProvider } from "react-router"
import type { FC } from "react"
import { LoginPage } from "@/pages/login"
import { HomePage } from "@/pages/home"
import { NotFoundPage } from "@/pages/not-found"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])

const Routes: FC = () => {
  return <RouterProvider router={router} />
}

export default Routes
