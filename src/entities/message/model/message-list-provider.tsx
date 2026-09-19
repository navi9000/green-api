import { useState, type FC, type PropsWithChildren } from "react"
import { MessageListContext } from "./message-list-context"
import type { Message, MessageListContextProps } from "./schema"

const MessageListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [chatList, setChatList] = useState<MessageListContextProps["chatList"]>(
    {
      "1": [{ id: "1", text: "Hello", timestamp: 1 }],
    },
  )

  const getMessagesByChat = (phoneNumber: string) => {
    return chatList[phoneNumber] ?? []
  }

  const addMessage = (phoneNumber: string, message: Message) => {
    const messageList = chatList[phoneNumber] ?? []
    messageList.push(message)
    setChatList((prev) => ({
      ...prev,
      [phoneNumber]: messageList,
    }))
  }

  const value = {
    chatList,
    getMessagesByChat,
    addMessage,
  }

  return (
    <MessageListContext.Provider value={value}>
      {children}
    </MessageListContext.Provider>
  )
}

export default MessageListProvider
