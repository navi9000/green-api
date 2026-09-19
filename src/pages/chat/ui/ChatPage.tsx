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
        <div className={styles.chatcontainer}>
          <div className={clsx(styles.wrapper)}>
            {Array.from({ length: 7 }, (_, index) => (
              <div style={{ textAlign: "justify" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
                accusantium nihil, quam repudiandae tempora blanditiis
                consequatur quo, asperiores, cupiditate molestias praesentium
                necessitatibus deleniti quia? Similique voluptates vel animi ab
                magni? {index}
              </div>
            ))}
          </div>
        </div>
        <div className={clsx(styles.inputcontainer)}>
          <div className={styles.wrapper}>
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
      </div>
    </>
  )
}

export default ChatPage
