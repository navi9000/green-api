import type { RefObject } from "react"
import { useEffect } from "react"

export const useClickOutside = <T extends HTMLElement, E extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void,
  excludeRef?: RefObject<E | null>,
) =>
  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (
        excludeRef?.current &&
        excludeRef.current.contains(e.target as Node)
      ) {
        return
      }
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [ref, callback, excludeRef])
