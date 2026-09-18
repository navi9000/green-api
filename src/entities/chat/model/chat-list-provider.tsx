import { useState, type FC, type PropsWithChildren } from "react"
import { type Chat } from "./schema"
import { ChatListContext } from "./chat-list-context"

const ChatListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [chatList] = useState<Chat[]>([
    { chatId: null, phoneNumber: 79150000000 },
  ])

  return (
    <ChatListContext.Provider value={{ chatList }}>
      {children}
    </ChatListContext.Provider>
  )
}

export default ChatListProvider
