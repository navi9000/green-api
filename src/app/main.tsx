import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./styles.css"
import Routes from "./routes"
import { AuthProvider } from "@/features/auth"
import { createChatClient } from "@/shared/api"

const client = createChatClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider client={client}>
      <Routes client={client} />
    </AuthProvider>
  </StrictMode>,
)
