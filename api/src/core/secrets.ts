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
	SESSION_SECRET: process.env.SESSION_SECRET
};
