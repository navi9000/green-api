import { useMessageList } from "@/entities/message/model/use-message-list"
import type { FC } from "react"
import { useParams } from "react-router"

const MessageList: FC = () => {
  const { phoneNumber } = useParams()
  const { getMessagesByChat } = useMessageList()

  return (
    <div>
      {getMessagesByChat(phoneNumber ?? "").map((message) => (
        <div key={message.id}>{message.text}</div>
      ))}
    </div>
  )
}

export default MessageList
