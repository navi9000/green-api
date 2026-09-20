import { useState, type FC, type PropsWithChildren } from "react"
import { MessageListContext } from "./message-list-context"
import type { Message, MessageListContextProps } from "./schema"

const MessageListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [chatList, setChatList] = useState<MessageListContextProps["chatList"]>(
    {},
  )

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
    addMessage,
  }

  return (
    <MessageListContext.Provider value={value}>
      {children}
    </MessageListContext.Provider>
  )
}

export default MessageListProvider
