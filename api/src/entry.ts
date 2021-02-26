import logger from './core/logger';
import secrets from './core/secrets';
import server from './server';
import connectMongoose from './core/database'


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
