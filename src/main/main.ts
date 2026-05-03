import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import { userRoutes } from '../routes/User.routes';
import { authRoutes } from '../routes/Auth.routes';
import { tagRoutes } from '../routes/Tag.routes';
import { taskRoutes } from '../routes/Task.routes';
import { notificationRoutes } from '../routes/Notification.routes';
import { agenda } from '../config/agenda/agenda';
import { scheduleCheckTaskAlerts } from '../config/agenda/jobs/checkTaskAlerts';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/tag', tagRoutes);
app.use('/task', taskRoutes);
app.use('/notification', notificationRoutes);

const PORT = process.env.PORT || 3333;

const mongoUri = process.env.MONGODB_URL as string;

mongoose
  .connect(mongoUri)
  .then(async () => {
    console.log('Connected to MongoDB Atlas');
    await agenda.start();
    await scheduleCheckTaskAlerts();
    console.log('Agenda started');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
