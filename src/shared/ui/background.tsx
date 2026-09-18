import type { FC } from "react"
import styles from "./background.module.css"
import clsx from "clsx"
import { Outlet } from "react-router"

const Background: FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.background}>
        <div className={clsx(styles.layer, styles.layerBase)} />
        <div className={clsx(styles.layer, styles.layerAdditional)} />
        <div className={clsx(styles.layer, styles.layerPattern)} />
      </div>
      <Outlet />
    </div>
  )
}

export default Background
