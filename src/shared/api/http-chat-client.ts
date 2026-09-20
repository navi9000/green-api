import type {
  AuthorizationResult,
  ChatClient,
  ClientAuthData,
  ClientChat,
  ClientMessage,
} from "./client"

export type HttpChatClientOptions = {
  baseUrl: string
  fetcher?: typeof fetch
}

export class HttpChatClient implements ChatClient {
  private readonly baseUrl: string
  private readonly fetcher: typeof fetch
  private idInstance: string
  private apiTokenInstance: string

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

    return (await response.json()) as T
  }
}
