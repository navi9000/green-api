import { useState, type FC, type PropsWithChildren } from "react"
import { MessageListContext } from "./message-list-context"
import type { Message, MessageListContextProps } from "./schema"
import type { ChatClient } from "@/shared/api"

type Props = PropsWithChildren<{ client: ChatClient }>

const MessageListProvider: FC<Props> = ({ children, client }) => {
  const [chatList, setChatList] = useState<MessageListContextProps["chatList"]>(
    {},
  )

  const addMessage = async (phoneNumber: string, text: string) => {
    const message: Message = await client.sendMessage(phoneNumber, text)
    const messageList = chatList[phoneNumber] ?? []
    const nextMessageList = [...messageList, message]
    setChatList((prev) => ({
      ...prev,
      [phoneNumber]: nextMessageList,
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
