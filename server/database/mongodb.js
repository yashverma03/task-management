import mongoose from 'mongoose';

const mongodb = async () => {
  const URL = process.env.DB_URI;

  try {
    await mongoose.connect(URL);
    console.log('Database connected successfully');
  } catch (error) {
    console.log(error);
  }
};

export default mongodb;
