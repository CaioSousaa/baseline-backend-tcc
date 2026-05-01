import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoutes from '../routes/User.routes';

const app = express();

app.use(express.json());
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3333;

const mongoUri = process.env.MONGODB_URL as string;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
