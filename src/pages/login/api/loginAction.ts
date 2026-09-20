import loginSchema from "../model/login-data"
import z from "zod"
import type { ChatClient } from "@/shared/api"

export const parseLoginForm = (formData: FormData) => ({
  idInstance: formData.get("idInstance"),
  apiTokenInstance: formData.get("apiTokenInstance"),
})

export const loginAction = async ({
  request,
  client,
}: {
  request: Request
  client: ChatClient
}) => {
  const formData = await request.formData()
  const credentials = parseLoginForm(formData)

  const validatedData = loginSchema.safeParse({
    idInstance: credentials.idInstance,
    apiTokenInstance: credentials.apiTokenInstance,
  })

  if (validatedData.error) {
    return { errors: z.treeifyError(validatedData.error).properties }
  }

  try {
    const { stateInstance } = await client.authorize(validatedData.data)
    if (stateInstance !== "authorized") {
      return {
        errors: {
          system: {
            errors: [stateInstance],
          },
        },
      }
    }

    return {
      ...validatedData.data,
    }
  } catch {
    return {}
  }
}
