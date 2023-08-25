import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongodb from './database/mongodb.js';

dotenv.config();

const app = express();

mongodb();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
