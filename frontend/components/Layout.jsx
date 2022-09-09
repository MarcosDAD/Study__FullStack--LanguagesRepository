import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Layout.module.css'
import Footer from './Footer'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">LANGUAGES ORGANIZER</a>
        </h1>

        <div className={styles.grid}>
          
        </div>
      </main>
      <Footer />
    </div>
  )
}
