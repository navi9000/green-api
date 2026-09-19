import { useState, type FC } from "react"
import type { Chat } from "../model/schema"
import { Link, useParams } from "react-router"
import styles from "./chat-list-item.module.css"
import clsx from "clsx"
import { Avatar } from "@/shared/ui"

const ChatListItem: FC<Chat> = ({ phoneNumber }) => {
  const params = useParams()
  const currentPhoneNumber = params?.phoneNumber ?? null
  const isCurrentPhoneNumber = phoneNumber.toString() === currentPhoneNumber
  const [isHovered, setIsHovered] = useState(false)

  const isSelected = isCurrentPhoneNumber || isHovered

  return (
    <Link
      to={`/${phoneNumber}`}
      className={clsx(styles.wrapper, { [styles.selected]: isSelected })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Avatar />
      <h3 className={styles.title}>{phoneNumber}</h3>
    </Link>
  )
}

export default ChatListItem
