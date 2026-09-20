import useToastContext from "../model/use-toaster-context"

export function useToastItem(id: string) {
  const {
    actions: { removeToast },
  } = useToastContext()

  return {
    remove: () => removeToast(id),
  }
}
