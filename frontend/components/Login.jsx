import {Button, Form, Container} from 'react-bootstrap';
import styles from '../styles/Form.module.css'
import Link from 'next/link';

export default function Login() {
    const login = async(event) => {
        event.preventDefault();
        console.log("oi");
    }

    const cadastro = async(event) => {
        event.preventDefault();
        console.log("oi");
    }

    return (
      <div className={styles.container}>
        <Form onSubmit={login}>
            <Form.Group controlId='emailGroup'>
                <Form.Control
                    type="email"
                    placeholder="Your email"
                    />
            </Form.Group>

            <Form.Group controlId='passGroup'>
                <Form.Control
                    type="password"
                    placeholder="Your password"
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