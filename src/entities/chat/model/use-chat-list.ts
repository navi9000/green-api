import { use } from "react"
import { ChatListContext } from "./chat-list-context"

export function useChatList() {
  const context = use(ChatListContext)
  if (!context) {
    throw new Error("useChatList must be under ChatListProvider")
  }
  return context
}
