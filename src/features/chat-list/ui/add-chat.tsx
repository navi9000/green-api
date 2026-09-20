import { Button, Input } from "@/shared/ui"
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
import { useAddToast } from "@/features/toaster"
import { HttpChatError } from "@/shared/api"

const AddChat: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const { addChat } = useChatList()
  const addToast = useAddToast()
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

  const onAdd = async () => {
    try {
      await addChat(+phoneNumber)
      setIsDialogVisible(false)
      setPhoneNumber("")
    } catch (error) {
      if (!(error instanceof HttpChatError) && error instanceof Error) {
        addToast({ message: error.message })
      }
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
          <Input
            value={phoneNumber}
            onChange={onChange}
            rightSlot={
              <Button
                palette="primary"
                size="xsmall"
                onClick={onAdd}
                disabled={phoneNumber.trim() === ""}
              >
                &rarr;
              </Button>
            }
          />
        </div>
      </Activity>
    </div>
  )
}

export default AddChat
