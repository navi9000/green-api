import type { FC } from "react"
import { useFetcher } from "react-router"
import type { LoginActionData } from "../model/login-data"

const LoginPage: FC = () => {
  const { state, data, Form } = useFetcher<LoginActionData>()

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
