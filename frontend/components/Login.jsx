import {Button, Form, Container} from 'react-bootstrap';
import styles from '../styles/Form.module.css'
import Link from 'next/link';
import {login, logout} from '../services/auth.js';
import api from '../services/api.js';

export default function Login() {
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
    
        // Get data from the form.
        const data = {
          email: event.target.email.value,
          password: event.target.password.value
        }
    
        const JSONdata = JSON.stringify(data)

        const result = await api.post('accounts/login', {
            email: data.email,
            password: data.password
        })
        
        login(result.data.token)
      }

    return (
      <div className={styles.container}>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='emailGroup'>
                <Form.Control
                    type="email"
                    placeholder="Your email"
                    name="email"
                    />
            </Form.Group>

            <Form.Group controlId='passGroup'>
                <Form.Control
                    type="password"
                    placeholder="Your password"
                    name="password"
                    />
            </Form.Group>

            <Button block="true" variant="primary" type="submit">Log In</Button>
            <div>
                New? <span><Link href="/login/register">Sign Up</Link></span>
            </div>
        </Form>
      </div>
    )
  }