import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import { Nav, RouteGuard } from '../components/Authenticator';

function MyApp({ Component, pageProps }) {
  
  return (
    <>
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </>
  )
}

export default MyApp
