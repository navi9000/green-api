import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./styles.css"
import Routes from "./routes"
import { AuthProvider } from "@/features/auth"
import { createChatClient } from "@/shared/api"
import { ToasterProvider } from "@/features/toaster"

const client = createChatClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToasterProvider>
      <AuthProvider client={client}>
        <Routes client={client} />
      </AuthProvider>
    </ToasterProvider>
  </StrictMode>,
)
