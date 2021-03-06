require('dotenv').config({ debug: process.env.DEBUG });
const { NODE_ENV, HOST, PORT } = process.env;

export default {
	HOST: HOST,
	PORT: PORT,
	IS_PROD: NODE_ENV === 'production',
	MONGO_URI_DEV: process.env.MONGO_URI_DEV,
	KITSU_API: process.env.KITSU_API,
	JOKES_API: process.env.JOKES_API,
	VERSION: process.env.VERSION,
	SESSION_SECRET: process.env.SESSION_SECRET,
	FRONTEND_ONE: process.env.FRONTEND_ONE as string,
	FRONTEND_TWO: process.env.FRONTEND_TWO as string,
	COOKIES_DOMAIN: process.env.COOKIES_DOMAIN as string,
};
