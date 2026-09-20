import type { FC } from "react"
import type { Message } from "../model/schema"
import { useMessageList } from "../model/use-message-list"
import { timestampToDay, timestampToTime } from "@/shared/utils/dates"
import styles from "./message-item.module.css"
import clsx from "clsx"

type Props = {
  message: Message
  phoneNumber: string
  index: number
}

const MessageItem: FC<Props> = ({ message, phoneNumber, index }) => {
  const {
    isFirstMessageInGroup,
    isFirstMessageOfDay,
    isLastMessageInGroup,
    isMessageAlignedToRight,
  } = useMessageList()
  return (
    <div className={styles.container}>
      {isFirstMessageOfDay(phoneNumber, index) && (
        <div className={styles.date}>{timestampToDay(message.timestamp)}</div>
      )}
      <div
        className={clsx(styles.messagecontainer, {
          [styles.messagecontainer_right]: isMessageAlignedToRight(
            phoneNumber,
            index,
          ),
          [styles.messagecontainer_firstingroup]:
            isFirstMessageInGroup(phoneNumber, index) ||
            isFirstMessageOfDay(phoneNumber, index),
          [styles.messagecontainer_lastingroup]: isLastMessageInGroup(
            phoneNumber,
            index,
          ),
        })}
      >
        <div className={styles.text}>{message.text}</div>
        <div className={styles.meta}>
          <div className={styles.time}>
            {timestampToTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageItem
