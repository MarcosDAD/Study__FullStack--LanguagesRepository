import {Button, Form, Container} from 'react-bootstrap';
import styles from '../styles/Form.module.css'
import Link from 'next/link';
import {login, logout} from '../services/auth.js';
import AccountsService from '../services/accounts.js';

import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  const handleSubmit = async (event) => {
      //Pausar o submit do form pra evitar o refresh
      event.preventDefault()
  
      //Data do form
      const data = {
        email: event.target.email.value,
        password: event.target.password.value
      }
      
      //Guardando em json pra caso precise
      const JSONdata = JSON.stringify(data)
      console.log(data)
      
      const services = new AccountsService();
      const result = await services.login(data.email, data.password);
      
      login(result.data.token)
      console.log(result)

      router.push('/profile')
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