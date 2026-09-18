import type { FC } from "react"
import styles from "./chat-list.module.css"
import { useChatList } from "@/entities/chat"
import { ChatListItem } from "@/entities/chat"
import { Button } from "@/shared/ui"

const ChatList: FC = () => {
  const { chatList } = useChatList()
  return (
    <aside className={styles.chatlistcontainer}>
      <div className={styles.header}>
        <h2>Chats</h2>
        <Button palette="primary" size="xsmall">
          <span style={{ fontSize: "24px" }}>+</span>
        </Button>
      </div>
      <div>
        {chatList.map((data) => (
          <ChatListItem {...data} />
        ))}
      </div>
    </aside>
  )
}

export default ChatList
