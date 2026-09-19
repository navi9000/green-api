import type { FC } from "react"
import { useParams } from "react-router"
import { ChatList } from "@/features/chat-list"
import styles from "./ChatPage.module.css"
import { Avatar } from "@/shared/ui"
import GoBackButton from "./GoBackButton"
import clsx from "clsx"
import MessageList from "./MessageList"
import AddMessage from "./AddMessage"

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
        <div className={styles.chatcontainer}>
          <div className={clsx(styles.wrapper, styles.tobottom)}>
            <MessageList />
          </div>
        </div>
        <div className={clsx(styles.inputcontainer)}>
          <div className={styles.wrapper}>
            <AddMessage />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatPage
