import type { SingleToastLike } from "../model/schema"
import useToastContext from "../model/use-toaster-context"

export function useAddToast() {
  const {
    actions: { addToast },
  } = useToastContext()

  const result = ({ message }: SingleToastLike) => addToast({ message })

  return result
}
