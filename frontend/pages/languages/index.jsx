import Head from 'next/head'
import Footer from '../../components/Footer'

export default function Languages() {
    //mocking
    async function GetLanguages(){
        const request_procedimento = await fetch("http://localhost:3002/languages", {
            method: "Get",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjEsImlhdCI6MTY2Mjc0NDc4MiwiZXhwIjoxNjYyNzQ2NTgyfQ.MpUULx2GvLI-wrbysl63rPp8O1S4Mz8tBxTk5puaOa6K2CKoyjM6YXMntQ706brpTyRnoTsEfCJTYdOAwmIFosRBKQ6Tn3tTKgqtcPNg398fyizzDDZvxbWftUvoWUPu9AGsZanCRxwXPf8n1cFeoXAOxuHYQkcrVULJDupFy-xTKDqGyFInw_Qf-bo2rU6YiHh9owpB1PAWNiENCGtlshH5SSTIWfCjlyDibBtD_DjcO4AiUc6MRTgztBf3f0FFzO0n8OPDRdCqFpTaoGeTUl8J_NBvOdH4kERL9zZIS84NHOmIAKtMmejNaU0qA-4N5pqyb-tATsU2k-Dy8QO54Q"
            },
      });
        const resultado = await request_procedimento;
        console.log(resultado);
    }
    return (
        <div>
            <Head>
                <title>Languages</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>
                Welcome to <a href="https://nextjs.org">LANGUAGES ORGANIZER</a>
                </h1>

                <button onClick={GetLanguages}>Get my languages</button>

                <div>
                
                </div>
            </main>
            <Footer />
        </div>
    )
}