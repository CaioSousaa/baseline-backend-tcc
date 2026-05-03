import Agenda from 'agenda';

const mongoUri = process.env.MONGODB_URL as string;

export const agenda = new Agenda({
  db: { address: mongoUri, collection: 'agendaJobs' },
  processEvery: '1 minute',
});
