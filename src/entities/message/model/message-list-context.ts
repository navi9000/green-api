import { createContext } from "react"
import type { MessageListContextProps } from "./schema"

export const MessageListContext = createContext<MessageListContextProps | null>(
  null,
)
