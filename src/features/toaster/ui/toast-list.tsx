import { type FC } from "react"
import { useToastList } from "../api/use-toast-list"
import { createPortal } from "react-dom"
import Toast from "./toast"
import styles from "./toast-list.module.css"

const ToastList: FC = () => {
  const { toastList } = useToastList()

  return createPortal(
    <div className={styles.toastlist}>
      {toastList
        .map((params) => <Toast key={params.id} {...params} />)
        .reverse()}
    </div>,
    document.body,
  )
}

export default ToastList
