import z from "zod"

const loginSchema = z.object({
  idInstance: z.string("Введите idInstance").trim(),
  apiTokenInstance: z.string("Введите apiTokenInstance").trim(),
})

type LoginActionErrors = Partial<
  Record<keyof z.infer<typeof loginSchema>, { errors: string[] }>
>

export type LoginActionData = {
  errors?: LoginActionErrors
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
