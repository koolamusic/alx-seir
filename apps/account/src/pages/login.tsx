import React from 'react';
import Link from 'next/link'
import { Box } from '@chakra-ui/react';
import { NextPageContext } from 'next';
import nookies, { parseCookies, setCookie } from 'nookies'

import { FormLayout, SubmitButton } from '../components/Layout'
import { FormPageHeader } from '../components/Header'
import { InputField, PasswordField } from '../components/Fields';
import { useForm } from 'react-hook-form';
import ResourceFactory from '../utils/adapter'
import { AxiosRequestConfig } from 'axios'

const baseURL = 'http://localhost:4000';


const defaultConfig: AxiosRequestConfig = {
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'X-Request-With': 'XMLHttpRequest',
    }
};

ResourceFactory.updateDefaults(defaultConfig)
class Login extends ResourceFactory.createResource("/v1/auth/login") { }



export default function Page(): JSX.Element {
    const { register, handleSubmit } = useForm();


    const onSubmit = async (data: any): Promise<void> => {
        console.log(data)
        const result = await Login.save(data)
        if (result) {
            const cookies = parseCookies()
            console.log(cookies)
        }
        console.log(result)
    };

    return (

        <FormLayout isDefaultHeader={true}>
            <FormPageHeader
                formHeading="Welcome back seri"
                formSubHeading="Login to your account to access your profile 😀"
            />

            <form onSubmit={handleSubmit(onSubmit)}>

                <InputField
                    register={register}
                    type="email"
                    required
                    label="Email Address"
                    placeholder="Your Email"
                    name="email"
                />
                <PasswordField
                    register={register}
                    required
                    label="Password"
                    placeholder="Secure Alphanumeric password"
                    name="password"
                    type="password"
                />

                {/* === form input subsection  === */}

                <SubmitButton mt={8} withIcon buttonName="Get Started" />
                <Box mb={6} mt={3} fontSize=".9rem" color="gray.600">
                    <Link href="/signup">Dont have an account? Signup</Link>
                </Box>

            </form>
        </FormLayout>

    )
}


export async function getServerSideProps(ctx: NextPageContext) {
    // Parse
    const cookies = nookies.get(ctx)
    if (cookies["__app.sid"]) {
        setCookie(null, '__app.sid', cookies["__app.sid"], {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        })
    }
    // Set
    nookies.set(ctx, 'fromServerSideProps', "brookies", {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
    })
    console.log(cookies)

    return { props: cookies }
}