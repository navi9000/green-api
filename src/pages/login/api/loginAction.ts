import loginSchema, { type LoginRequest } from "../model/login-data"
import z from "zod"

export const mockLoginRequest: LoginRequest = async () => {
  return await Promise.resolve({
    stateInstance: "authorized",
  })
}

export const parseLoginForm = (formData: FormData) => ({
  idInstance: formData.get("idInstance"),
  apiTokenInstance: formData.get("apiTokenInstance"),
})

export const loginAction = async ({ request }: { request: Request }) => {
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
    const { stateInstance } = await mockLoginRequest(validatedData.data)
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
    return {
      errors: {
        system: {
          errors: ["Unknown error"],
        },
      },
    }
  }
}
