import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import { userRoutes } from '../routes/User.routes';
import { authRoutes } from '../routes/Auth.routes';
import { tagRoutes } from '../routes/Tag.routes';
import { taskRoutes } from '../routes/Task.routes';
const app = express();

app.use(express.json());
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/tag', tagRoutes);
app.use('/task', taskRoutes);
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
