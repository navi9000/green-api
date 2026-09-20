import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./styles.css"
import { ToasterProvider } from "@/features/toaster"
import App from "./app"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToasterProvider>
      <App />
    </ToasterProvider>
  </StrictMode>,
)
