import { createContext } from "react"
import type { Chat } from "./schema"

type ChatListContextProps = {
  chatList: Chat[]
  addChat: (phoneNumber: number) => Promise<void>
}

export const ChatListContext = createContext<ChatListContextProps | null>(null)
