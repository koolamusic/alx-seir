import { useEffect } from 'react'

export default function Logout() {

    useEffect(() => {
        setTimeout(() => {
            process.browser && window.location.replace("/login")
        }, 2000);
    }, [])
    return (
        <section>
            Keep Calm while we log you out
        </section>
    )
}