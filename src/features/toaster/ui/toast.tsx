import { type FC, useEffect } from "react"
import type { SingleToast } from "../model/schema"
import styles from "./toast.module.css"
import { useToastItem } from "../api/use-toast-item"

const Toast: FC<SingleToast> = ({ message = "", id }) => {
  const { remove } = useToastItem(id)
  useEffect(() => {
    const timeout = setTimeout(() => {
      remove()
    }, 5000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return <div className={styles.toast}>{message}</div>
}

export default Toast
