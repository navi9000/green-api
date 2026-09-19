import { use } from "react"
import { MessageListContext } from "./message-list-context"

export function useMessageList() {
  const context = use(MessageListContext)
  if (!context) {
    throw new Error("useMessageList must be under MessageListContext")
  }
  return context
}
