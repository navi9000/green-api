import { useMessageListContext } from "./use-message-list-context"

export function useMessageList(phoneNumber: string) {
  const { chatList } = useMessageListContext()

  return {
    length: chatList[phoneNumber]?.length ?? 0,
  }
}
