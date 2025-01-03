import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI || "");
    console.log(`Connected to DB:  ${connect.connection.host}`);
  } catch (error) {
    console.log(`connected failed: ${error}`);
  }
};

export default connectToDB;