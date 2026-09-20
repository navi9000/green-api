import type {
  AuthorizationResult,
  ChatClient,
  ClientAuthData,
  ClientChat,
  ClientMessage,
  ErrorReporter,
  IncomingMessageListener,
} from "./client"

type ApiErrorPayload = {
  code?: unknown
  message?: unknown
  status?: unknown
  invokeStatus?: { description?: unknown }
  correspondentsStatus?: { description?: unknown }
}

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
  onError?: ErrorReporter
}

export class HttpChatError extends Error {
  readonly status?: number
  readonly code?: string

  constructor(message: string, status?: number, code?: string) {
    super(message)
    this.name = "HttpChatError"
    this.status = status
    this.code = code
  }
}

export class HttpChatClient implements ChatClient {
  private readonly baseUrl: string
  private readonly fetcher: typeof fetch
  private readonly onError?: ErrorReporter
  private readonly incomingMessageListeners = new Set<IncomingMessageListener>()
  private idInstance: string
  private apiTokenInstance: string
  private isReceiving = false
  private readonly reportedErrors = new Map<string, number>()

  constructor({
    baseUrl,
    fetcher = globalThis.fetch.bind(globalThis),
    onError,
  }: HttpChatClientOptions) {
    this.baseUrl = baseUrl.replace(/\/$/, "")
    this.fetcher = fetcher
    this.onError = onError
    this.idInstance = ""
    this.apiTokenInstance = ""
  }

  async authorize({
    idInstance,
    apiTokenInstance,
  }: ClientAuthData): Promise<AuthorizationResult> {
    this.idInstance = idInstance
    this.apiTokenInstance = apiTokenInstance

    const result = await this.request<unknown>(
      `/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,
      {
        method: "GET",
      },
    )

    if (!this.isAuthorizationResult(result)) {
      const error = new HttpChatError(
        "Green API вернул некорректный ответ авторизации",
        200,
      )
      this.reportError(error)
      throw error
    }

    if (result.stateInstance !== "authorized") {
      const error = new HttpChatError(
        `Green API: состояние инстанса ${result.stateInstance}`,
        200,
        result.stateInstance,
      )
      this.reportError(error)
      throw error
    }

    return result
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
    try {
      const response = await this.fetcher(`${this.baseUrl}${path}`, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...init.headers,
        },
      })

      if (response.status === 204) {
        return undefined as T
      }

      const responseText = await response.text()
      const payload = this.parseResponseBody(responseText, response.status)

      if (!response.ok || this.isErrorPayload(payload)) {
        throw this.createApiError(response.status, payload)
      }

      return payload as T
    } catch (error) {
      const normalizedError = this.normalizeError(error, path)
      this.reportError(normalizedError)
      throw normalizedError
    }
  }

  private parseResponseBody(responseText: string, status: number) {
    if (!responseText) {
      return undefined
    }

    try {
      return JSON.parse(responseText) as unknown
    } catch {
      if (status >= 200 && status < 300) {
        throw new Error("The API returned an invalid response")
      }
      return responseText
    }
  }

  private isErrorPayload(payload: unknown): payload is ApiErrorPayload {
    if (!payload || typeof payload !== "object") {
      return false
    }

    const candidate = payload as ApiErrorPayload
    return (
      candidate.status === "error" ||
      (typeof candidate.code === "string" &&
        typeof candidate.message === "string")
    )
  }

  private isAuthorizationResult(
    payload: unknown,
  ): payload is AuthorizationResult {
    if (!payload || typeof payload !== "object") {
      return false
    }

    const stateInstance = (payload as { stateInstance?: unknown }).stateInstance
    return (
      stateInstance === "notAuthorized" ||
      stateInstance === "authorized" ||
      stateInstance === "blocked" ||
      stateInstance === "starting" ||
      stateInstance === "suspended" ||
      stateInstance === "pendingPassword"
    )
  }

  private createApiError(status: number, payload: unknown) {
    const candidate = this.isErrorPayload(payload) ? payload : undefined
    const description =
      candidate?.invokeStatus?.description ??
      candidate?.correspondentsStatus?.description
    const message =
      typeof description === "string"
        ? description
        : typeof candidate?.message === "string"
          ? candidate.message
          : this.getStatusMessage(status)
    const code =
      typeof candidate?.code === "string" ? candidate.code : undefined

    return new HttpChatError(message, status, code)
  }

  private normalizeError(error: unknown, path: string) {
    if (error instanceof HttpChatError) {
      return error
    }

    const message = error instanceof Error ? error.message : "Unknown API error"
    return new HttpChatError(`${path}: ${message}`)
  }

  private getStatusMessage(status: number) {
    const messages: Record<number, string> = {
      400: "Некорректный запрос к Green API",
      401: "Неверный токен Green API",
      403: "Неверный idInstance или URL запроса Green API",
      404: "Метод Green API не найден",
      429: "Превышен лимит запросов Green API",
      466: "Превышена квота Green API",
      499: "Запрос к Green API был прерван",
      500: "Внутренняя ошибка Green API",
      502: "Green API временно недоступен",
    }

    return messages[status] ?? `Ошибка Green API (${status})`
  }

  private reportError(error: HttpChatError) {
    if (!this.onError) {
      return
    }

    const key = `${error.status ?? "network"}:${error.code ?? ""}:${error.message}`
    const now = Date.now()
    const lastReportedAt = this.reportedErrors.get(key) ?? 0
    if (now - lastReportedAt < 5_000) {
      return
    }

    this.reportedErrors.set(key, now)
    this.onError(error)
  }
}
