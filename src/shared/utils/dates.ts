export const timestampToDay = (timestamp: number) => {
  return new Intl.DateTimeFormat("ru-RU", { dateStyle: "long" }).format(
    timestamp,
  )
}

export const timestampToTime = (timestamp: number) => {
  return new Intl.DateTimeFormat("ru-RU", { timeStyle: "short" }).format(
    timestamp,
  )
}
