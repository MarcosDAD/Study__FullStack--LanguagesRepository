import styles from '../styles/Menu.module.css'
import Link from 'next/link';

export default function Menu() {
    return (
      <div className={styles.menu}>
        <span><Link href="/connect">Connect</Link></span>
        <span><Link href="/profile">Me</Link></span>
      </div>
    )
  }