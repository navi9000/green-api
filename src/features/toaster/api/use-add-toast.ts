import type { SingleToastLike } from "../model/schema"
import useToastContext from "../model/use-toaster-context"
import { useCallback } from "react"

export function useAddToast() {
  const {
    actions: { addToast },
  } = useToastContext()

  return useCallback(
    ({ message }: SingleToastLike) => addToast({ message }),
    [addToast],
  )
}
