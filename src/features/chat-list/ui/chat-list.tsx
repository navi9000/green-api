import type { FC } from "react"
import styles from "./chat-list.module.css"
import { useChatList } from "@/entities/chat"
import { ChatListItem } from "@/entities/chat"

const ChatList: FC = () => {
  const { chatList } = useChatList()
  return (
    <aside className={styles.chatlistcontainer}>
      <div>
        {chatList.map((data) => (
          <ChatListItem {...data} />
        ))}
      </div>
    </aside>
  )
}

export default ChatList
