import { Button } from "@/shared/ui"
import type { FC } from "react"

const GoBackButton: FC = () => {
  return (
    <Button palette="ghost" size="small" onClick={() => window.history.back()}>
      <span style={{ fontSize: "24px" }}>&#706;</span>
    </Button>
  )
}

export default GoBackButton
