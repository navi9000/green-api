import useToastContext from "../model/use-toaster-context"

export function useToastList() {
  const {
    state: { toastList },
  } = useToastContext()

  return {
    toastList,
  }
}
