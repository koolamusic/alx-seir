import { setLogLevel, LogLevels } from '@typegoose/typegoose';
import passport from 'passport'
import logger from './core/logger';
import secrets from './core/secrets';
import server from './server';
import connectMongoose from './core/database'
import * as strategy from './core/auth'

/* Log Level for Typegoose */
setLogLevel(LogLevels.TRACE);

/* Sessions and authentication Middleware */
passport.use(strategy.localStrategy)
passport.serializeUser(strategy.userSerializer)
passport.deserializeUser(strategy.userDeserializer)


/* Connect Database */
connectMongoose(secrets.MONGO_URI_DEV as string)


async function main() {

  /* Start & Listen on HTTP Server */
  await server.listen({ port: secrets.PORT, host: secrets.HOST });
  logger.info(`Running at http://${secrets.HOST}:${secrets.PORT}`);
}

process.on('unhandledRejection', (err) => {
  if (err) {
    console.error(err);
    logger.debug(err);
  }
  process.exit(1);
});

main();
