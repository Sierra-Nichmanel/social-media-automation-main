import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", async () => {
      console.log("MongoDB Connected");
    });
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
