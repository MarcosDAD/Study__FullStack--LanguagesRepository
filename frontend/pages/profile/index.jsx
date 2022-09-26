import Head from 'next/head'
import styles from '../../styles/Shared.module.css'
import Image from 'next/image'

import stylesProfile from '../../styles/Profile.module.css'
import stylesRemove from '../../styles/Modals/RemoveLanguage.module.css'
import stylesAdd from '../../styles/Modals/AddLanguage.module.css'

import Footer from '../../components/Footer'
import Menu from '../../components/Menu'
import RemoveLanguage from '../../components/Modals/RemoveLanguage'
import AddLanguage from '../../components/Modals/AddLanguage'

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import AccountsService from '../../services/accounts.js'
import LanguagesService from '../../services/languages.js'
import {getUserId} from '../../services/auth.js';
import LanguagesProficiency from '../../services/languages/languagesProficiency.js'

export default function Home() {
  const router = useRouter();

  const [user, setUser] = useState({});
  const [languages, setLanguages] = useState([]);

  const [isActivate, setActive] = useState(false)
  const [languageNumber, setLanguageNumber] = useState(0)

  const [isActivateAdd, setActiveAdd] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const languagesService = new LanguagesService();
      const result = await languagesService.languages();
      const json = await result.data;
      console.log(json)
      setLanguages(json);

      /*const accountsService = new AccountsService();
      const userId = getUserId();
      const resUser = await accountsService.account(userId);
      const jsonUser = await resUser.data;
      setUser(jsonUser);*/
    };
    fetchData();
  }, [])

  const ModalRemove = async (number) => {
    setActive(!isActivate)

    if (number !== "0"){
      setLanguageNumber(number)
    }
  }

  const ModalAdd = async (number) => {
    setActiveAdd(!isActivateAdd)
  }

  const PopulateLanguages = () => {
    //console.log(languages)
    //console.log(user)

    return <tbody>
    <tr>
      <th className={stylesProfile.languages_label}>Language  </th>
      <th className={stylesProfile.languages_proficiency}>Proficiency</th>
      <th className={stylesProfile.languages_studying}>Studying</th>
      <th className={stylesProfile.languages_remove}>Remove</th>
    </tr>
    {languages.map((object) => (
    <tr key={object.id}>
      <td className={stylesProfile.languages_label}>{object.label}</td>
      <td className={stylesProfile.languages_proficiency}>
      <div className={stylesProfile.languages_anchor}>{LanguagesProficiency[`${object.proficiency}`]}</div></td>
      <td className={stylesProfile.languages_studying}>
      {object.studying &&
        <div className={stylesProfile.languages_anchor}>
        <Image
          src="/images/star.png"
          alt="Img to show active languages"
          width={24}
          height={24}
          style=""
        />
        </div>
      }
      </td>
      <td className={stylesProfile.languages_remove}>
      <div className={stylesProfile.languages_anchor}>
        <Image
          src="/images/delete.png"
          alt="Img to remove languages"
          width={24}
          height={24}
          onClick={_ => ModalRemove(`${object.id}`)}
        />
        </div>
      </td>
    </tr>
    ))}
    </tbody>
  }

  return (
      <div>
        <Head>
          <title>Me</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {isActivate &&
          <div className={stylesRemove.delete}>
            <div className={stylesRemove.delete__hide} onClick={_ => ModalRemove("0")}></div>
            <RemoveLanguage languageID={languageNumber}/>
          </div>
        }
        {isActivateAdd &&
          <div className={stylesAdd.add}>
            <div className={stylesAdd.add__hide} onClick={_ => ModalAdd()}></div>
            <AddLanguage/>
          </div>
        }
        
        <Menu />
        <main className={global.main}>
          <div className={stylesProfile.languages}>
            <div></div>
            <div className={stylesProfile.languages_content}>
              <table>
                {PopulateLanguages()}
              </table>
            </div>
            <div>
              <div className={stylesProfile.languages_anchor}>
              <Image
                src="/images/add.png"
                alt="Img to remove languages"
                width={48}
                height={48}
                onClick={_ => ModalAdd()}
              />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
  )
}
