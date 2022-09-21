import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import { Nav, RouteGuard } from '../components/Authenticator';

function MyApp({ Component, pageProps }) {
  
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
