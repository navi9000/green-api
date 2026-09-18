import { Button } from "@/shared/ui"
import {
  useState,
  type ChangeEventHandler,
  type FC,
  Activity,
  useRef,
} from "react"
import styles from "./add-chat.module.css"
import { useChatList } from "@/entities/chat"
import { useClickOutside } from "@/shared/utils"

const AddChat: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const { addChat } = useChatList()
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useClickOutside(dialogRef, () => setIsDialogVisible(false), buttonRef)

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value
    if (!new RegExp("^[0-9]{0,}$").test(value)) {
      return
    }
    setPhoneNumber(value)
  }

  const onOpenDialog = () => {
    setIsDialogVisible((prev) => !prev)
  }

  const onAdd = () => {
    try {
      addChat(+phoneNumber)
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message)
      }
      throw err
    }
  }

  return (
    <div className={styles.container}>
      <Button
        palette="primary"
        size="xsmall"
        onClick={onOpenDialog}
        ref={buttonRef}
      >
        <span style={{ fontSize: "24px" }}>+</span>
      </Button>
      <Activity mode={isDialogVisible ? "visible" : "hidden"}>
        <div className={styles.dialog} ref={dialogRef}>
          <h4 className={styles.dialogtitle}>Введите номер телефона</h4>
          <input value={phoneNumber} onChange={onChange} />
          <button onClick={onAdd}>Добавить</button>
        </div>
      </Activity>
    </div>
  )
}

export default AddChat
