import { useEffect, type FC } from "react"
import { useFetcher } from "react-router"
import type { LoginActionData } from "../model/login-data"
import { useAuthContext } from "@/features/auth"
import { Button, Input } from "@/shared/ui"
import styles from "./LoginPage.module.css"

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
    <div className={styles.page}>
      <Form method="POST" autoComplete="off" className={styles.form}>
        <h1>Авторизация</h1>
        <Input name="idInstance" placeholder="Введите ID" />
        {!!data?.errors?.idInstance && (
          <div>{data.errors.idInstance.errors[0]}</div>
        )}
        <Input name="apiTokenInstance" placeholder="Введите токен" />
        {!!data?.errors?.apiTokenInstance && (
          <div>{data.errors.apiTokenInstance.errors[0]}</div>
        )}
        <Button
          size="small"
          palette="primary"
          type="submit"
          disabled={state !== "idle"}
        >
          &rarr;
        </Button>
      </Form>
    </div>
  )
}

export default LoginPage
