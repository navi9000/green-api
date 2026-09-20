import { MessageItem } from "@/entities/message"
import { useMessageList } from "@/entities/message/model/use-message-list"
import type { FC } from "react"
import { useParams } from "react-router"

const MessageList: FC = () => {
  const { phoneNumber } = useParams()
  const { getMessagesByChat } = useMessageList()

  if (!phoneNumber) {
    return null
  }

  return (
    <div>
      {getMessagesByChat(phoneNumber ?? "").map((message, index) => (
        <MessageItem
          key={message.id}
          phoneNumber={phoneNumber}
          message={message}
          index={index}
        />
      ))}
    </div>
  )
}

export default MessageList
