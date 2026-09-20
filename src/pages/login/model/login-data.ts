import z from "zod"

const loginSchema = z.object({
  idInstance: z
    .string("Введите idInstance")
    .length(12, "Длина idInstance должна составлять 12 символов")
    .trim(),
  apiTokenInstance: z
    .string("Введите apiTokenInstance")
    .min(10, "apiTokenInstance слишком короткий")
    .trim(),
})

type LoginActionErrors = Partial<
  Record<keyof z.infer<typeof loginSchema>, { errors: string[] }>
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
