import type {
  AuthorizationResult,
  ChatClient,
  ClientAuthData,
  ClientChat,
  ClientMessage,
  IncomingMessageListener,
} from "./client"

type NotificationResponse = {
  receiptId: number
  body?: {
    typeWebhook?: string
    timestamp?: number
    idMessage?: string
    senderData?: {
      chatId?: string
      chatType?: string
      senderPhoneNumber?: number
    }
    messageData?: {
      typeMessage?: string
      textMessageData?: {
        textMessage?: string
      }
    }
  }
}

export type HttpChatClientOptions = {
  baseUrl: string
  fetcher?: typeof fetch
}

export class HttpChatClient implements ChatClient {
  private readonly baseUrl: string
  private readonly fetcher: typeof fetch
  private readonly incomingMessageListeners = new Set<IncomingMessageListener>()
  private idInstance: string
  private apiTokenInstance: string
  private isReceiving = false

  constructor({
    baseUrl,
    fetcher = globalThis.fetch.bind(globalThis),
  }: HttpChatClientOptions) {
    this.baseUrl = baseUrl.replace(/\/$/, "")
    this.fetcher = fetcher
    this.idInstance = ""
    this.apiTokenInstance = ""
  }

  async authorize({
    idInstance,
    apiTokenInstance,
  }: ClientAuthData): Promise<AuthorizationResult> {
    this.idInstance = idInstance
    this.apiTokenInstance = apiTokenInstance

    return this.request<AuthorizationResult>(
      `/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,
      {
        method: "GET",
      },
    )
  }

  async logout(): Promise<void> {
    this.isReceiving = false
    this.incomingMessageListeners.clear()
    this.idInstance = ""
    this.apiTokenInstance = ""
    console.log("logged out")
  }

  async createChat(phoneNumber: number): Promise<ClientChat> {
    return this.request<ClientChat>(
      `/waInstance${this.idInstance}/checkAccount/${this.apiTokenInstance}`,
      {
        method: "POST",
        body: JSON.stringify({ phoneNumber }),
      },
    )
  }

  async sendMessage(phoneNumber: string, text: string): Promise<ClientMessage> {
    return this.request<ClientMessage>(
      `/waInstance${this.idInstance}/sendMessage/${this.apiTokenInstance}`,
      {
        method: "POST",
        body: JSON.stringify({
          chatId: phoneNumber.trim().concat("@c.us"),
          message: text,
        }),
      },
    )
  }

  subscribeToIncomingMessages(listener: IncomingMessageListener): () => void {
    this.incomingMessageListeners.add(listener)
    if (!this.isReceiving) {
      this.isReceiving = true
      void this.receiveLoop()
    }

    return () => {
      this.incomingMessageListeners.delete(listener)
      if (this.incomingMessageListeners.size === 0) {
        this.isReceiving = false
      }
    }
  }

  private async receiveLoop() {
    while (this.isReceiving && this.incomingMessageListeners.size > 0) {
      try {
        const notification = await this.request<
          NotificationResponse | undefined
        >(
          `/waInstance${this.idInstance}/receiveNotification/${this.apiTokenInstance}?receiveTimeout=30`,
          { method: "GET" },
        )

        if (!notification) {
          continue
        }

        const message = this.toClientMessage(notification)
        if (message) {
          const phoneNumber = this.getPhoneNumber(notification)
          for (const listener of this.incomingMessageListeners) {
            listener(phoneNumber, message)
          }
        }

        await this.deleteNotification(notification.receiptId)
      } catch {
        if (this.isReceiving) {
          await new Promise((resolve) => setTimeout(resolve, 1_000))
        }
      }
    }
  }

  private async deleteNotification(receiptId: number) {
    await this.request(
      `/waInstance${this.idInstance}/deleteNotification/${this.apiTokenInstance}/${receiptId}`,
      { method: "DELETE" },
    )
  }

  private toClientMessage(
    notification: NotificationResponse,
  ): ClientMessage | undefined {
    const body = notification.body
    const text = body?.messageData?.textMessageData?.textMessage
    if (
      body?.typeWebhook !== "incomingMessageReceived" ||
      body.senderData?.chatType !== "user" ||
      body.messageData?.typeMessage !== "textMessage" ||
      !body.idMessage ||
      !text
    ) {
      return undefined
    }

    return {
      id: body.idMessage,
      text,
      timestamp: (body.timestamp ?? Math.floor(Date.now() / 1_000)) * 1_000,
      sender: "guest",
    }
  }

  private getPhoneNumber(notification: NotificationResponse) {
    const senderData = notification.body?.senderData
    if (senderData?.senderPhoneNumber) {
      return String(senderData.senderPhoneNumber)
    }

    return (senderData?.chatId ?? "").replace(/@c\.us$/, "")
  }

  private async request<T>(path: string, init: RequestInit): Promise<T> {
    const response = await this.fetcher(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    if (response.status === 204) {
      return undefined as T
    }

    const responseText = await response.text()
    return (responseText ? JSON.parse(responseText) : undefined) as T
  }
}
