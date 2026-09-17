import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./styles.css"
import Routes from "./routes"
import { AuthProvider } from "@/features/auth"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </StrictMode>,
)
