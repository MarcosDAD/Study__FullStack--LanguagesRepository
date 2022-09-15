import {Button, Form, Container} from 'react-bootstrap';
import styles from '../styles/Form.module.css'
import Link from 'next/link';
import { useState } from 'react';
import api from '../services/api.js';

export default function Register() {
    const [username, setUsername] = useState({})
    const register = async(event) => {
        event.preventDefault();
        console.log("oi");
    }

    const cadastro = async(event) => {
        event.preventDefault();
        console.log("oi");
    }

    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
    
        // Get data from the form.
        const data = {
          username: event.target.username.value,
          email: event.target.email.value,
          password: event.target.password.value,
          nativeLanguage: event.target.nativeLanguage.value
        }
    
        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        const result = await api.post('accounts', {
            username: data.username,
            email: data.email,
            password: data.password,
            status: 100,
            native_language: data.nativeLanguage
        })
        console.log(result)
      }

    return (
      <div className={styles.container}>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='usernameGroup'>
                <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    />
            </Form.Group>

            <Form.Group controlId='emailGroup'>
                <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    />
            </Form.Group>

            <Form.Group controlId='passGroup'>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    />
            </Form.Group>

            <Form.Group controlId='languageGroup'>
                <Form.Control
                    type="text"
                    placeholder="Native Language"
                    name="nativeLanguage"
                    />
            </Form.Group>

            <Button block="true" variant="primary" type="submit">Register</Button>
            <div>
                <span><Link href="/login">Back</Link></span>
            </div>
        </Form>
      </div>
    )
  }