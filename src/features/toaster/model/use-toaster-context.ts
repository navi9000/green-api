import { use } from "react"
import ToasterContext from "./toaster-context"

export default function useToastContext() {
  const context = use(ToasterContext)

  if (!context) {
    throw Error(
      "Error: useToastContext must be placed within a ToasterProvider",
    )
  }

  return context
}
