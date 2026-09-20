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
  addMessage: (phoneNumber: string, message: Message) => void
}
