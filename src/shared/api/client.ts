export type ClientAuthData = {
  idInstance: string
  apiTokenInstance: string
}

export type ClientChat = {
  chatId: string | null
  phoneNumber: number
}

export type ClientMessage = {
  id: string
  text: string
  timestamp: number
  sender: "own" | "guest"
}

export type AuthorizationResult = {
  stateInstance:
    | "notAuthorized"
    | "authorized"
    | "blocked"
    | "starting"
    | "suspended"
    | "pendingPassword"
}

export type ChatClient = {
  authorize: (authData: ClientAuthData) => Promise<AuthorizationResult>
  logout: () => Promise<void>
  createChat: (phoneNumber: number) => Promise<ClientChat>
  sendMessage: (phoneNumber: string, text: string) => Promise<ClientMessage>
}
