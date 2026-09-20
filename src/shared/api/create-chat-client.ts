import type { ChatClient, ErrorReporter } from "./client"
import { HttpChatClient } from "./http-chat-client"
import { LocalChatClient } from "./local-chat-client"

export type ChatClientConfig = {
  isRemote?: boolean
  apiUrl?: string
  onError?: ErrorReporter
}

export function createChatClient({
  isRemote = import.meta.env.VITE_IS_REMOTE_CLIENT === "true",
  apiUrl = import.meta.env.VITE_CHAT_API_URL,
  onError,
}: ChatClientConfig = {}): ChatClient {
  if (!isRemote) {
    return new LocalChatClient()
  }

  if (isRemote) {
    if (!apiUrl) {
      throw new Error("VITE_CHAT_API_URL is required for the remote client")
    }
    return new HttpChatClient({ baseUrl: apiUrl, onError })
  }

  throw new Error(`Unsupported chat client: ${isRemote}`)
}
