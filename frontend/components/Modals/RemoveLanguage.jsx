import stylesRemove from '../../styles/Modals/RemoveLanguage.module.css'
import {Button, Form, Container} from 'react-bootstrap';

import LanguagesService from '../../services/languages.js'

import { useRouter } from 'next/router';

export default function RemoveLanguage(props) {
    const router = useRouter();

    const HandleRemove = async (number) => {
        const languageIdLocal = props.languageID

        const languagesService = new LanguagesService();
        const result = await languagesService.delete(languageIdLocal);

        router.push('/profile')
    }

    return (
        <div className={stylesRemove.delete__wrapper}>
            <div className={stylesRemove.deleteContent}>
                <div className={stylesRemove.delete__lastContainer}>
                    <p>Are you sure about removing this language?</p>
                    <div className={stylesRemove.inside_deletar}>
                        <Button block="true" variant="primary" onClick={HandleRemove}>Remove</Button>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    )
  }