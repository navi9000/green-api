import { createContext } from "react"
import type { ToasterProviderValue } from "./schema"

const ToasterContext = createContext<ToasterProviderValue | null>(null)

export default ToasterContext
