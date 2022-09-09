import {Button, Form, Container} from 'react-bootstrap';
import styles from '../styles/Form.module.css'
import Link from 'next/link';

export default function Register() {
    const register = async(event) => {
        event.preventDefault();
        console.log("oi");
    }

    const cadastro = async(event) => {
        event.preventDefault();
        console.log("oi");
    }

    return (
      <div className={styles.container}>
        <Form onSubmit={register}>
            <Form.Group controlId='usernameGroup'>
                <Form.Control
                    type="text"
                    placeholder="Username"
                    />
            </Form.Group>

            <Form.Group controlId='emailGroup'>
                <Form.Control
                    type="email"
                    placeholder="Email"
                    />
            </Form.Group>

            <Form.Group controlId='passGroup'>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    />
            </Form.Group>

            <Form.Group controlId='languageGroup'>
                <Form.Control
                    type="text"
                    placeholder="Native Language"
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