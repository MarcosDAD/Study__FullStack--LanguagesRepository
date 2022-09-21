import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Layout.module.css'

import Footer from '../../components/Footer'
import Login from '../../components/Login'
import Menu from '../../components/Menu'

import {isAuthenticated} from '../../services/auth.js';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import LanguagesService from '../../services/languages.js'

export default function Home() {
  const router = useRouter();

  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const services = new LanguagesService();
      const result = await services.languages();
      const json = await result.data;
      setLanguages((languages) => [...json]);
      console.log(languages)
    };
    fetchData();
  }, [])

  

  return (
      <div>
        <Menu />
        <Head>
          <title>Me</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={global.main}>
          <div>
            {router.basePath}
          </div>

          <div className={styles.grid}>
            
          </div>
        </main>
        <Footer />
      </div>
  )
}
