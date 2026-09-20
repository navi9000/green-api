import type {
  AuthorizationResult,
  ChatClient,
  ClientChat,
  ClientMessage,
  IncomingMessageListener,
} from "./client"

export class LocalChatClient implements ChatClient {
  private readonly chats: ClientChat[] = []
  private readonly messages: Record<string, ClientMessage[]> = {}
  private readonly incomingMessageListeners = new Set<IncomingMessageListener>()
  private readonly replyTimers = new Map<
    string,
    ReturnType<typeof setTimeout>
  >()
  private isAuthorized = false

  async authorize(): Promise<AuthorizationResult> {
    this.isAuthorized = true
    return { stateInstance: "authorized" }
  }

  async logout(): Promise<void> {
    this.isAuthorized = false
    for (const timer of this.replyTimers.values()) {
      clearTimeout(timer)
    }
    this.replyTimers.clear()
    this.chats.length = 0
    for (const phoneNumber of Object.keys(this.messages)) {
      delete this.messages[phoneNumber]
    }
  }

  async createChat(phoneNumber: number): Promise<ClientChat> {
    if (!this.isAuthorized) {
      throw new Error("Не авторизован")
    }
    if (this.chats.some((chat) => chat.phoneNumber === phoneNumber)) {
      throw new Error("Уже добавлен")
    }

    const chat = { chatId: crypto.randomUUID(), phoneNumber }
    this.chats.unshift(chat)
    return chat
  }

  async sendMessage(phoneNumber: string, text: string): Promise<ClientMessage> {
    if (!this.isAuthorized) {
      throw new Error("Не авторизован")
    }

    const message: ClientMessage = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      text,
      sender: "own",
    }
    const messageList = this.messages[phoneNumber] ?? []
    messageList.push(message)
    this.messages[phoneNumber] = messageList
    this.scheduleReply(phoneNumber)
    return message
  }

  subscribeToIncomingMessages(listener: IncomingMessageListener): () => void {
    this.incomingMessageListeners.add(listener)

    return () => {
      this.incomingMessageListeners.delete(listener)
    }
  }

  private scheduleReply(phoneNumber: string) {
    const previousTimer = this.replyTimers.get(phoneNumber)
    if (previousTimer) {
      clearTimeout(previousTimer)
    }

    const timer = setTimeout(() => {
      this.replyTimers.delete(phoneNumber)
      const message: ClientMessage = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        text: "Информация получена",
        sender: "guest",
      }
      const messageList = this.messages[phoneNumber] ?? []
      messageList.push(message)
      this.messages[phoneNumber] = messageList

      for (const listener of this.incomingMessageListeners) {
        listener(phoneNumber, message)
      }
    }, 30_000)

    this.replyTimers.set(phoneNumber, timer)
  }
}
