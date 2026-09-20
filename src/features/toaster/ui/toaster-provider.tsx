import { type FC, type PropsWithChildren, useCallback, useState } from "react"
import ToasterContext from "../model/toaster-context"
import type { SingleToast, SingleToastLike } from "../model/schema"
import ToastList from "./toast-list"

const createId = (list: string[] = []) => {
  const alphabet =
    "abcdefghefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const alphabetLength = alphabet.length
  const getSymbol = () => {
    return alphabet[Math.floor(Math.random() * alphabetLength)]
  }
  const id = Array(6)
    .fill(0)
    .map(() => getSymbol())
    .join("")

  if (list.includes(id)) {
    return createId(list)
  }
  return id
}

const ToasterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [toastList, setToastList] = useState<SingleToast[]>([])

  const addToast = useCallback((input: SingleToastLike) => {
    setToastList((prev) => {
      const id = createId(prev.map((item) => item.id))
      return prev.concat({ ...input, id })
    })
  }, [])

  const removeToast = useCallback((id: string) => {
    setToastList((prev) => {
      const index = prev.findIndex((item) => item.id === id)
      return [...prev.slice(0, index), ...prev.slice(index + 1)]
    })
  }, [])

  const value = {
    state: {
      toastList,
    },
    actions: {
      addToast,
      removeToast,
    },
  }

  return (
    <ToasterContext.Provider value={value}>
      {children}
      <ToastList />
    </ToasterContext.Provider>
  )
}

export default ToasterProvider
