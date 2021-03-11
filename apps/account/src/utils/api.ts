import ResourceFactory from './adapter'
import { AxiosRequestConfig } from 'axios'



const baseURL = process.env.NEXT_PUBLIC_API_URL;
const defaultConfig: AxiosRequestConfig = {
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'X-Request-With': 'XMLHttpRequest'
    }
};

ResourceFactory.updateDefaults(defaultConfig)

export class MangaAPI extends ResourceFactory.createResource("/v1/outbox/manga") { }
export class JokeAPI extends ResourceFactory.createResource("/v1/outbox/jokes/ten") { }
export class LoginAPI extends ResourceFactory.createResource("/v1/auth/login") { }
export class SignupAPI extends ResourceFactory.createResource("/v1/auth/signup") { }
export class LogoutAPI extends ResourceFactory.createResource("/logout") { }



// const baseURL = process.env.NEXT_PUBLIC_API_URL;
// const defaultConfig = {
//     baseURL: baseURL,
//     withCredentials: true,
//     headers: {
//         'X-Request-With': 'XMLHttpRequest'
//     }
// };

// ResourceFactory.updateDefaults(defaultConfig)

// class Login extends ResourceFactory.createResource("/v1/auth/login") { }

