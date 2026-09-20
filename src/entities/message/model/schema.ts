export type Message = {
  id: string
  text: string
  timestamp: number
  sender: "own" | "guest"
}

export type MessageListContextProps = {
  chatList: {
    [phoneNumber: string]: Message[]
  }
  getMessagesByChat: (phoneNumber: string) => Message[]
  addMessage: (phoneNumber: string, message: Message) => void
  isFirstMessageInGroup: (phoneNumber: string, index: number) => boolean
  isLastMessageInGroup: (phoneNumber: string, index: number) => boolean
  isFirstMessageOfDay: (phoneNumber: string, index: number) => boolean
  isMessageAlignedToRight: (phoneNumber: string, index: number) => boolean
}
