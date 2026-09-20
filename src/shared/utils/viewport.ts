import { useSyncExternalStore } from "react"

export function useIsLargeScreen(breakpoint: number) {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener("resize", callback)

      return () => {
        window.removeEventListener("resize", callback)
      }
    },
    () => window.innerWidth > breakpoint,
    () => null,
  )
}
