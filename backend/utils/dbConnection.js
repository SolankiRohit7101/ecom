import mongoose from "mongoose";

const dbConnect = async () => {
  await mongoose
    .connect(process.env.MONGODB)
    .then(({ connection }) =>
      console.log(`${connection.name}://${connection.host}/${connection.port}`)
    )
    .catch((error) => {
      console.log(error);
    });
};

export default dbConnect;
