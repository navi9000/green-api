import { createBrowserRouter, RouterProvider } from "react-router"
import type { FC } from "react"
import { loginAction, LoginPage } from "@/pages/login"
import { HomePage } from "@/pages/home"
import { NotFoundPage } from "@/pages/not-found"
import { PublicRoute, PrivateRoute } from "@/features/auth"

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute element={<HomePage />} />,
  },
  {
    path: "/login",
    element: <PublicRoute element={<LoginPage />} />,
    action: loginAction,
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
