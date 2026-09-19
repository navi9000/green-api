import { useState, type FC, type PropsWithChildren } from "react"
import { type Chat } from "./schema"
import { ChatListContext } from "./chat-list-context"

const ChatListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [chatList, setChatList] = useState<Chat[]>([])

  const addChat = (phoneNumber: number) => {
    if (chatList.some((chat) => chat.phoneNumber === phoneNumber)) {
      throw new Error("Уже добавлен")
    }
    setChatList((prev) => [{ chatId: null, phoneNumber }, ...prev])
  }

  return (
    <ChatListContext.Provider value={{ chatList, addChat }}>
      {children}
    </ChatListContext.Provider>
  )
}

export default ChatListProvider
