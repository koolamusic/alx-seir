import { NextPageContext } from 'next';
import * as Auth from '../utils/auth'
import ResourceFactory from '../utils/adapter'
import { AxiosRequestConfig } from 'axios'


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
    return (
        <section>
            Keep Calm while we log you out
        </section>
    )
}





export async function getServerSideProps(ctx: NextPageContext) {
    await SignOut.get().then(() => {
        Auth.logoutUser(ctx, '/');
    })

    return {
        props: null
    }
};

