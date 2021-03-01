/**
 * Authentication handler actions for the client application
 * Methods will include
 * @method logout - clear cookies after call to api
 * @method setToken - persist cookies to browser
 * @method getToken - get Token from browser
 * @method isAuth - Check that user is authenticated
 */

import { IncomingHttpHeaders } from "http";
import { NextPageContext } from "next";


// import redirect from './redirect';
// import { setCookie, getCookie, removeCookie } from './session';
// import settings from 'config/settings';
// import base64 from 'base-64';

// export const loginUser = async (token, target = '/', payload = {}) => {
//     // Sign in a user by setting the cookie with the token received

//     setCookie(settings.authKey, token);

//     const payloadHash = base64.encode(JSON.stringify(payload));
//     setCookie(settings.profileKey, payloadHash);

//     // consider redirecting using window.location
//     // redirect(target);
//     window.location = target;
// };

// export const logoutUser = (ctx = {}, target = settings.loginRoute) => {
//     // Sign out user by removing the cookie from the broswer session
//     if (process.browser) {
//         removeCookie(settings.authKey);
//         removeCookie(settings.profileKey);
//         redirect(target, ctx);
//         // consider redirecting using window.location
//         // window.location = target;
//     }
// };

export const getToken = (ctx: NextPageContext) => {
    // Fetch the auth token for a user
    // return getCookie(settings.authKey, ctx.req);
    console.log(ctx, "sent------------------>")
    return ctx.req?.headers
};

// export const getProfile = ctx => {
//     const profile = getCookie(settings.profileKey, ctx.req);
//     return JSON.parse(base64.decode(profile));
// };

// export const isAuthenticated = ctx => !!getToken(ctx);

// export const redirectIfAuthenticated = (ctx, target = '/') => {
//     if (isAuthenticated(ctx)) {
//         redirect(target, ctx);
//         // consider redirecting here using browser
//         return true;
//     }
//     return false;
// };

// export const redirectIfNotAuthenticated = (
//     ctx,
//     target = settings.loginRoute
// ) => {
//     if (!isAuthenticated(ctx)) {
//         redirect(target, ctx);
//         return true;
//     }

//     return false;
// };

export const getAuthHeaders = async (ctx: NextPageContext) => {
    const token = getToken(ctx);
    const headers: IncomingHttpHeaders = {};

    if (process.browser) {
        headers['X-Request-With'] = 'XMLHttpRequest';
    }
    if (token) {
        headers['Authorization'] = `${token}`;
    }

    return headers;
};