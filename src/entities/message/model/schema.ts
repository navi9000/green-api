export type Message = {
  id: string
  text: string
  timestamp: number
}

export type MessageListContextProps = {
  chatList: {
    [phoneNumber: string]: Message[]
  }
  getMessagesByChat: (phoneNumber: string) => Message[]
  addMessage: (phoneNumber: string, message: Message) => void
}
