import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const URI = `mongodb://127.0.0.1:27017/${process.env.DATABASE}`;

const connectDb = async () => {
  mongoose.connect(URI, {});
};

export default connectDb;
