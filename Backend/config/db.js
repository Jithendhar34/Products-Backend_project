import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb connected: ${conn.connection.host}`); // Fixed here

  } catch (error) {
    console.log(`Error: ${error.message}`); // Fixed here too
    process.exit(1); // 1 --> failure, 0 --> success
  }
}
