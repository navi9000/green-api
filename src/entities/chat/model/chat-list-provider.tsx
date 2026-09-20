import { useState, type FC, type PropsWithChildren } from "react"
import { type Chat } from "./schema"
import { ChatListContext } from "./chat-list-context"
import type { ChatClient } from "@/shared/api"

type Props = PropsWithChildren<{ client: ChatClient }>

const ChatListProvider: FC<Props> = ({ children, client }) => {
  const [chatList, setChatList] = useState<Chat[]>([])

  const addChat = async (phoneNumber: number) => {
    const chat = await client.createChat(phoneNumber)
    setChatList((prev) => [chat, ...prev])
  }

  return (
    <ChatListContext.Provider value={{ chatList, addChat }}>
      {children}
    </ChatListContext.Provider>
  )
}

export default ChatListProvider
