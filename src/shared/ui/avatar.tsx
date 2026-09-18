import type { FC } from "react"
import styles from "./avatar.module.css"
import clsx from "clsx"

type Props = {
  size?: "normal" | "small"
}

const Avatar: FC<Props> = ({ size = "normal" }) => {
  return (
    <div
      className={clsx(styles.avatar, { [styles[`avatar__${size}`]]: size })}
    ></div>
  )
}

export default Avatar
