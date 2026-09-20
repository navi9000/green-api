import { useState, type FC } from "react"
import { AuthProvider } from "@/features/auth"
import { useAddToast } from "@/features/toaster"
import { createChatClient } from "@/shared/api"
import Routes from "./routes"

const App: FC = () => {
  const addToast = useAddToast()
  const [client] = useState(() =>
    createChatClient({
      onError: (error) => addToast({ message: error.message }),
    }),
  )

  return (
    <AuthProvider client={client}>
      <Routes client={client} />
    </AuthProvider>
  )
}

export default App
