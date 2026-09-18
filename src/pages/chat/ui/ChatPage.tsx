import type { FC } from "react"
import { useParams } from "react-router"
import { ChatList } from "@/features/chat-list"

const ChatPage: FC = () => {
  const { phonneNumber } = useParams()

  return (
    <>
      <ChatList />
      <div style={{ zIndex: 1 }}>{phonneNumber}</div>
    </>
  )
}

export default ChatPage
