import { useState, type FC, type PropsWithChildren } from "react"
import { MessageListContext } from "./message-list-context"
import type { Message, MessageListContextProps } from "./schema"
import { timestampToDay } from "@/shared/utils/dates"

const MessageListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [chatList, setChatList] = useState<MessageListContextProps["chatList"]>(
    {},
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

  const isFirstMessageOfDay = (phoneNumber: string, index: number) => {
    if (index === 0) {
      return true
    }
    const currMessageDate = timestampToDay(
      chatList[phoneNumber][index].timestamp,
    )
    const prevMessageDate = timestampToDay(
      chatList[phoneNumber][index - 1].timestamp,
    )
    return currMessageDate !== prevMessageDate
  }

  const isFirstMessageInGroup = (phoneNumber: string, index: number) => {
    if (index === 0) {
      return true
    }
    const currSender = chatList[phoneNumber][index].sender
    const prevSender = chatList[phoneNumber][index - 1].sender
    return currSender !== prevSender
  }

  const isLastMessageInGroup = (phoneNumber: string, index: number) => {
    if (chatList[phoneNumber].length === index + 1) {
      return true
    }
    const currSender = chatList[phoneNumber][index].sender
    const nextSender = chatList[phoneNumber][index + 1].sender
    return currSender !== nextSender
  }

  const isMessageAlignedToRight = (phoneNumber: string, index: number) => {
    return chatList[phoneNumber][index].sender === "own"
  }

  const value = {
    chatList,
    getMessagesByChat,
    addMessage,
    isFirstMessageOfDay,
    isFirstMessageInGroup,
    isLastMessageInGroup,
    isMessageAlignedToRight,
  }

  return (
    <MessageListContext.Provider value={value}>
      {children}
    </MessageListContext.Provider>
  )
}

export default MessageListProvider
