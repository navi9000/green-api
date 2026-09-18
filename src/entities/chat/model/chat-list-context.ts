import { createContext } from "react"
import type { Chat } from "./schema"

type ChatListContextProps = {
  chatList: Chat[]
}

export const ChatListContext = createContext<ChatListContextProps | null>(null)
