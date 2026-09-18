import type { FC } from "react"
import styles from "./chat-list.module.css"
import { useChatList } from "@/entities/chat"
import { ChatListItem } from "@/entities/chat"
import AddChat from "./add-chat"

const ChatList: FC = () => {
  const { chatList } = useChatList()
  return (
    <aside className={styles.chatlistcontainer}>
      <div className={styles.header}>
        <h2>Chats</h2>
        <AddChat />
      </div>
      <div>
        {chatList.map((data) => (
          <ChatListItem key={data.phoneNumber} {...data} />
        ))}
      </div>
    </aside>
  )
}

export default ChatList
