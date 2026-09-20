import { useMessageListContext } from "@/entities/message/model/use-message-list-context"
import { Button, Input } from "@/shared/ui"
import { useState, type FC } from "react"
import { useParams } from "react-router"

const AddMessage: FC = () => {
  const [message, setMessage] = useState("")
  const { phoneNumber } = useParams()
  const { addMessage } = useMessageListContext()

  const saveMessage = async () => {
    if (!phoneNumber || !message.trim()) {
      return
    }
    await addMessage(phoneNumber, message)
    setMessage("")
  }
  return (
    <Input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Message..."
      rightSlot={
        <Button
          palette="primary"
          size="xsmall"
          onClick={saveMessage}
          disabled={message.trim() === ""}
        >
          &uarr;
        </Button>
      }
    />
  )
}

export default AddMessage
