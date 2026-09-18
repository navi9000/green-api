import type { FC } from "react"
import { useParams } from "react-router"
import { ChatList } from "@/features/chat-list"
import styles from "./ChatPage.module.css"
import { Avatar } from "@/shared/ui"
import GoBackButton from "./GoBackButton"

const ChatPage: FC = () => {
  const { phoneNumber } = useParams()

  return (
    <>
      <ChatList />
      <div className={styles.container}>
        <div className={styles.header}>
          <GoBackButton />
          <div className={styles.info}>
            <Avatar size="small" />
            <span>{phoneNumber}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatPage
