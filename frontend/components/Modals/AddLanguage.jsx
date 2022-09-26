import stylesAdd from '../../styles/Modals/AddLanguage.module.css'
import {Button, Form, Container} from 'react-bootstrap';

import LanguagesService from '../../services/languages.js'

import { useRouter } from 'next/router';

export default function AddLanguage(props) {
    const router = useRouter();

    const HandleAdd = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
    
        // Get data from the form.
        const data = {
          label: event.target.label.value,
          proficiency: event.target.proficiency.value,
          studying: event.target.studying.value
        }

        data.studying = (data.studying === "on") ? true : false

        const languagesService = new LanguagesService();
        const result = await languagesService.add(data);
        if (result.status === 201){
            router.push('/profile')
        }
    }

    const GetProficiency = () => {
        return (
            <Form.Select name="proficiency">
                <option>Open this select menu</option>
                <option value="10">A1</option>
                <option value="20">A2</option>
                <option value="30">B1</option>
                <option value="40">B2</option>
                <option value="50">C1</option>
                <option value="60">C2</option>
            </Form.Select>
        )
    }

    return (
        <div className={stylesAdd.add__wrapper}>
            <div className={stylesAdd.addContent}>
                <div className={stylesAdd.add__lastContainer}>
                <Form onSubmit={HandleAdd}>
                    <Form.Group controlId='labelGroup'>
                        <Form.Control
                            type="label"
                            placeholder="New Language"
                            name="label"
                            />
                    </Form.Group>

                    <Form.Group controlId='proficiencyGroup'>
                        {GetProficiency()}
                    </Form.Group>

                    <Form.Group controlId='studyingGroup'>
                        <Form.Check name="studying" label="Studying"/>
                    </Form.Group>

                    <Button block="true" variant="primary" type="submit">Add</Button>
                </Form>
                </div>
            </div>
            <div></div>
        </div>
    )
  }