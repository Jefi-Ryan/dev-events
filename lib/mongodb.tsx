import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured");
  }

  const connection = await mongoose.connect(MONGODB_URI);

  console.log("MongoDB connected!");

  return connection;
}

export default connectDB;