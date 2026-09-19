import { createBrowserRouter, RouterProvider } from "react-router"
import type { FC } from "react"
import { loginAction, LoginPage } from "@/pages/login"
import { HomePage } from "@/pages/home"
import { PublicRoute, PrivateRoute } from "@/features/auth"
import { ChatPage } from "@/pages/chat"
import { ChatListProvider } from "@/entities/chat"
import { Background } from "@/shared/ui"
import { MessageListProvider } from "@/entities/message"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <PublicRoute element={<LoginPage />} />,
    action: loginAction,
  },
  {
    path: "/",
    element: (
      <PrivateRoute
        element={
          <ChatListProvider>
            <MessageListProvider>
              <Background />
            </MessageListProvider>
          </ChatListProvider>
        }
      />
    ),
    children: [
      {
        path: "/",
        element: <PrivateRoute element={<HomePage />} />,
      },
      {
        path: "/:phoneNumber",
        element: <PrivateRoute element={<ChatPage />} />,
      },
    ],
  },
])

const Routes: FC = () => {
  return <RouterProvider router={router} />
}

export default Routes
