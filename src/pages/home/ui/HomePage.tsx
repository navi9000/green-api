import type { FC } from "react"
import styles from "./HomePage.module.css"
import clsx from "clsx"

const HomePage: FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.background}>
        <div className={clsx(styles.layer, styles.layerBase)} />
        <div className={clsx(styles.layer, styles.layerAdditional)} />
        <div className={clsx(styles.layer, styles.layerPattern)} />
      </div>
      <aside className={styles.chatlistcontainer}></aside>
      <div className={styles.chatcontainer}></div>
    </div>
  )
}

export default HomePage
