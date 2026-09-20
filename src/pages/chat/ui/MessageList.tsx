import { MessageItem, useMessageList } from "@/entities/message"
import type { FC } from "react"
import { useParams } from "react-router"

const MessageList: FC = () => {
  const { phoneNumber } = useParams()
  const { length } = useMessageList(phoneNumber ?? "")

  if (!phoneNumber) {
    return null
  }

  return (
    <div>
      {Array.from({ length }, (_, index) => (
        <MessageItem key={index} index={index} phoneNumber={phoneNumber} />
      ))}
    </div>
  )
}

export default MessageList
