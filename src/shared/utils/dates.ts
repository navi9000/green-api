export const timestampToDay = (timestamp: number) => {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
    timestamp,
  )
}

export const timestampToTime = (timestamp: number) => {
  return new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(
    timestamp,
  )
}
