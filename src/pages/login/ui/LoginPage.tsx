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
        <h1 className={styles.title}>Авторизация</h1>
        <Input
          className={styles.input}
          name="idInstance"
          placeholder="Введите idInstance"
        />
        {!!data?.errors?.idInstance && (
          <div className={styles.error}>{data.errors.idInstance.errors[0]}</div>
        )}
        <Input
          className={styles.input}
          name="apiTokenInstance"
          placeholder="Введите apiTokenInstance"
        />
        {!!data?.errors?.apiTokenInstance && (
          <div className={styles.error}>
            {data.errors.apiTokenInstance.errors[0]}
          </div>
        )}
        <div className={styles.actions}>
          <span>Войти</span>
          <Button
            size="small"
            palette="primary"
            type="submit"
            disabled={state !== "idle"}
          >
            &rarr;
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default LoginPage
