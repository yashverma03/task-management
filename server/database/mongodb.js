import mongoose from 'mongoose';

const mongodb = async () => {
  try {
    const URL = process.env.DB_URI;
    
    await mongoose.connect(URL);
    console.log('Database connected successfully');
  } catch (error) {
    console.log(error);
  }
};

export default mongodb;
