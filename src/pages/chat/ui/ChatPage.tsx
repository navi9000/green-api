import type { FC } from "react"
import { useParams } from "react-router"
import { ChatList } from "@/features/chat-list"
import styles from "./ChatPage.module.css"
import { Avatar, Button, Input } from "@/shared/ui"
import GoBackButton from "./GoBackButton"
import clsx from "clsx"

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
        <div className={clsx(styles.chatcontainer, styles.wrapper)}></div>
        <div className={clsx(styles.inputcontainer, styles.wrapper)}>
          <Input
            placeholder="Message..."
            rightSlot={
              <Button palette="primary" size="xsmall">
                &uarr;
              </Button>
            }
          />
        </div>
      </div>
    </>
  )
}

export default ChatPage
