import { use } from "react"
import { MessageListContext } from "./message-list-context"

export function useMessageListContext() {
  const context = use(MessageListContext)
  if (!context) {
    throw new Error("useMessageListContext must be under MessageListContext")
  }
  return context
}
