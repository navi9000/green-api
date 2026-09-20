import type {
  AuthorizationResult,
  ChatClient,
  ClientChat,
  ClientMessage,
} from "./client"

export class LocalChatClient implements ChatClient {
  private readonly chats: ClientChat[] = []
  private readonly messages: Record<string, ClientMessage[]> = {}
  private isAuthorized = false

  async authorize(): Promise<AuthorizationResult> {
    this.isAuthorized = true
    return { stateInstance: "authorized" }
  }

  async logout(): Promise<void> {
    this.isAuthorized = false
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
    return message
  }
}
