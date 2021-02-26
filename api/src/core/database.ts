import * as mongoose from 'mongoose';

/* connect to database */
export default async function connectMongoose() {
  await mongoose
    .connect(process.env.MONGO_URI_DEV, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('DB CONNECTED'))
    .catch((err) => console.log(err));
}
