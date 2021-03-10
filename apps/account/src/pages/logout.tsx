import { NextPageContext } from 'next';
import * as Auth from '../utils/auth'

export default function Logout() {
    return (
        <section>
            Keep Calm while we log you out
        </section>
    )
}





export async function getServerSideProps(ctx: NextPageContext) {
    Auth.logoutUser(ctx, '/');
    return {
        props: null
    }
};

