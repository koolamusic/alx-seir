import mongoose from 'mongoose';

/* connect to database */
export default async function connectMongoose(__mongo_uri__: string) {
  await mongoose
    .connect(__mongo_uri__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('DB CONNECTED'))
    .catch((err) => console.log(err));



  // const kittenSchema = new mongoose.Schema({
  //   name: String
  // });

  // const Kitten = mongoose.model('Kitten', kittenSchema);

  // let document = await Kitten.create({ name: 'Kitty' });
  // console.log(document)
}
