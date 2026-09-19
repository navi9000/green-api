import type { ComponentProps, FC, ReactNode } from "react"
import styles from "./input.module.css"
import clsx from "clsx"

interface Props extends ComponentProps<"input"> {
  rightSlot?: ReactNode
}

const Input: FC<Props> = ({ rightSlot, className, ...rest }) => {
  return (
    <div className={clsx(styles.inputfield, className)}>
      <input className={styles.input} {...rest} />
      {rightSlot}
    </div>
  )
}

export default Input
