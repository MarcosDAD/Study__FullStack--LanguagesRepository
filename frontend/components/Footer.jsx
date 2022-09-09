import styles from '../styles/Footer.module.css'

export default function Footer() {
    return (
      <div>
        <footer className={styles.footer}>
            Powered by{' '}
            <span><a href="https://github.com/MarcosDAD">Marcos Diniz</a></span>
        </footer>
      </div>
    )
  }