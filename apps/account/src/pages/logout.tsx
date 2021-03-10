import { useEffect } from 'react'
import { NextPageContext } from 'next';
import * as Auth from '../utils/auth'
import { AxiosRequestConfig } from 'axios'
import ResourceFactory from '../utils/adapter'

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const defaultConfig: AxiosRequestConfig = {
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'X-Request-With': 'XMLHttpRequest',
    }
};

ResourceFactory.updateDefaults(defaultConfig)
class SignOut extends ResourceFactory.createResource("/v1/auth/logout") { }


export default function Logout() {

    useEffect(() => {
        (async function () {
            await SignOut.get()
        })()
    }, []);

    return (
        <section>
            Keep Calm while we log you out
        </section>
    )
}





// export async function getServerSideProps(ctx: NextPageContext) {
Logout.getInitialProps = async (ctx: NextPageContext) => {

    Auth.logoutUser(ctx, '/');
    return {
        // props: {
        //     data: "empty"
        // }
    }
};

