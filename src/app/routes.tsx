import { createBrowserRouter, RouterProvider } from "react-router"
import type { FC } from "react"
import { loginAction, LoginPage } from "@/pages/login"
import { HomePage } from "@/pages/home"
import { PublicRoute, PrivateRoute } from "@/features/auth"
import { ChatPage } from "@/pages/chat"
import { ChatListProvider } from "@/entities/chat"
import { Background } from "@/shared/ui"
import { MessageListProvider } from "@/entities/message"
import type { ChatClient } from "@/shared/api"

const createRouter = (client: ChatClient) =>
  createBrowserRouter(
    [
      {
        path: "/login",
        element: <PublicRoute element={<LoginPage />} />,
        action: ({ request }) => loginAction({ request, client }),
      },
      {
        path: "/",
        element: (
          <PrivateRoute
            element={
              <ChatListProvider client={client}>
                <MessageListProvider client={client}>
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
    ],
    { basename: import.meta.env.BASE_URL },
  )

type Props = { client: ChatClient }

const Routes: FC<Props> = ({ client }) => {
  return <RouterProvider router={createRouter(client)} />
}

export default Routes
