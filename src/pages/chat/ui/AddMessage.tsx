import { useMessageListContext } from "@/entities/message/model/use-message-list-context"
import { Button, Input } from "@/shared/ui"
import { useState, type FC } from "react"
import { useParams } from "react-router"
import { useAddToast } from "@/features/toaster"
import { HttpChatError } from "@/shared/api"

const AddMessage: FC = () => {
  const [message, setMessage] = useState("")
  const { phoneNumber } = useParams()
  const { addMessage } = useMessageListContext()
  const addToast = useAddToast()

  const saveMessage = async () => {
    if (!phoneNumber || !message.trim()) {
      return
    }
    try {
      await addMessage(phoneNumber, message)
      setMessage("")
    } catch (error) {
      if (!(error instanceof HttpChatError) && error instanceof Error) {
        addToast({ message: error.message })
      }
    }
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
