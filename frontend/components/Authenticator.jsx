import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import {isAuthenticated} from '../services/auth.js';

export { RouteGuard };

function RouteGuard({ children }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // Rodar authCheck logo que iniciar o redirecionamento
        authCheck(router.asPath);

        // ao começar o redirecionamento - esconde o conteúdo da página trocando o bool de retoro pra false
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // quando o redirecionamento estiver ok - faça a checagem do auth
        router.events.on('routeChangeComplete', authCheck)

        // retirando os eventos ao final do useEffect
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    }, []);

    function authCheck(url) {
        // redireciona pro Login se não autorizado
        const publicPaths = ['/','/login'];
        const path = url.split('?')[0];
        if (!isAuthenticated() && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/login',
                query: { returnUrl: router.asPath }
            });
        } else if (isAuthenticated() && publicPaths.includes(path)){
            setAuthorized(true);
            router.push({
                pathname: '/profile',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }

    return (authorized && children);
}