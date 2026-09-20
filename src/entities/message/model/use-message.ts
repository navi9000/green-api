import { timestampToDay, timestampToTime } from "@/shared/utils/dates"
import { useMessageListContext } from "./use-message-list-context"

export function useMessage(phoneNumber: string, index: number) {
  const { chatList } = useMessageListContext()
  const currChatList = chatList[phoneNumber]

  const isFirstOfDay = () => {
    if (index === 0) {
      return true
    }
    const currMessageDate = timestampToDay(currChatList[index].timestamp)
    const prevMessageDate = timestampToDay(currChatList[index - 1].timestamp)
    return currMessageDate !== prevMessageDate
  }

  const isFirstInGroup = () => {
    if (index === 0) {
      return true
    }
    const currSender = currChatList[index].sender
    const prevSender = currChatList[index - 1].sender
    return currSender !== prevSender
  }

  const isLastInGroup = () => {
    if (currChatList.length === index + 1) {
      return true
    }
    const currSender = currChatList[index].sender
    const nextSender = currChatList[index + 1].sender
    return currSender !== nextSender
  }

  const isRightAligned = () => {
    return currChatList[index].sender === "own"
  }

  return {
    isFirstOfDay: isFirstOfDay(),
    isFirstInGroup: isFirstInGroup(),
    isLastInGroup: isLastInGroup(),
    isRightAligned: isRightAligned(),
    date: timestampToDay(currChatList[index].timestamp),
    time: timestampToTime(currChatList[index].timestamp),
    text: currChatList[index].text,
  }
}
