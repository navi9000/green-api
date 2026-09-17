import { useEffect, type FC } from "react"
import { useFetcher } from "react-router"
import type { LoginActionData } from "../model/login-data"
import { useAuthContext } from "@/features/auth"

const LoginPage: FC = () => {
  const { state, data, Form } = useFetcher<LoginActionData>()
  const { authenticate } = useAuthContext()

  useEffect(() => {
    if (!data || !data.idInstance || !data.apiTokenInstance) {
      return
    }
    authenticate({
      idInstance: data.idInstance,
      apiTokenInstance: data.apiTokenInstance,
    })
  }, [authenticate, data])

  return (
    <div>
      <Form method="POST" autoComplete="off">
        <div>Авторизация</div>
        <input name="idInstance" placeholder="Введите ID" />
        {!!data?.errors?.idInstance && (
          <div>{data.errors.idInstance.errors[0]}</div>
        )}
        <input name="apiTokenInstance" placeholder="Введите токен" />
        {!!data?.errors?.apiTokenInstance && (
          <div>{data.errors.apiTokenInstance.errors[0]}</div>
        )}
        <button type="submit" disabled={state !== "idle"}>
          Войти
        </button>
      </Form>
    </div>
  )
}

export default LoginPage
