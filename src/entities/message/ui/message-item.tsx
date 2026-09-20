import type { FC } from "react"
import styles from "./message-item.module.css"
import clsx from "clsx"
import { useMessage } from "../model/use-message"

type Props = {
  phoneNumber: string
  index: number
}

const MessageItem: FC<Props> = ({ phoneNumber, index }) => {
  const {
    isFirstInGroup,
    isFirstOfDay,
    isLastInGroup,
    isRightAligned,
    date,
    time,
    text,
  } = useMessage(phoneNumber, index)
  return (
    <div className={styles.container}>
      {isFirstOfDay && <div className={styles.date}>{date}</div>}
      <div
        className={clsx(styles.messagecontainer, {
          [styles.messagecontainer_right]: isRightAligned,
          [styles.messagecontainer_firstingroup]:
            isFirstInGroup || isFirstOfDay,
          [styles.messagecontainer_lastingroup]: isLastInGroup,
        })}
      >
        <div className={styles.text}>{text}</div>
        <div className={styles.meta}>
          <div className={styles.time}>{time}</div>
        </div>
      </div>
    </div>
  )
}

export default MessageItem
