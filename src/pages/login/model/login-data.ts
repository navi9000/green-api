import z from "zod"

const loginSchema = z.object({
  idInstance: z.string().min(1, "Введите idInstance").trim(),
  apiTokenInstance: z.string().min(1, "Введите apiTokenInstance").trim(),
})

type LoginActionErrors = Partial<
  Record<keyof z.infer<typeof loginSchema> | "system", { errors: string[] }>
>

export type LoginActionData = {
  errors?: LoginActionErrors
  idInstance?: string
  apiTokenInstance?: string
}

export type AuthorizationStatus =
  | "notAuthorized"
  | "authorized"
  | "blocked"
  | "starting"
  | "suspended"
  | "pendingPassword"

export type LoginActionResponse = {
  stateInstance: AuthorizationStatus
}

export type LoginRequest = (
  credentials: z.infer<typeof loginSchema>,
) => Promise<LoginActionResponse>

export default loginSchema
