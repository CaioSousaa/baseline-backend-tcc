import { Agenda } from 'agenda';
import { MongoBackend } from '@agendajs/mongo-backend';

const mongoUri = process.env.MONGODB_URL as string;

export const agenda = new Agenda({
  backend: new MongoBackend({ address: mongoUri, collection: 'agendaJobs' }),
  processEvery: '5 hours',
});
