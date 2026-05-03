import { agenda } from '../agenda';
import { TaskModel } from '../../../infra/mongo/schemas/Task';
import { NotificationModel } from '../../../infra/mongo/schemas/NotificationSchema';

const JOB_NAME = 'check-task-alerts';

agenda.define(JOB_NAME, async () => {
  const now = new Date();
  const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const tasks = await TaskModel.find({
    alert: { $exists: true, $ne: null },
    dueDate: { $gte: now, $lte: in24Hours },
    status: { $ne: 'done' },
  });

  for (const task of tasks) {
    const alreadyNotified = await NotificationModel.findOne({
      task: task._id,
      owner: task.owner,
    });

    if (alreadyNotified) continue;

    await NotificationModel.create({
      owner: task.owner,
      task: task._id,
      message: task.alert || `A tarefa "${task.title}" vence em menos de 24 horas.`,
      read: false,
    });
  }
});

export const scheduleCheckTaskAlerts = async () => {
  await agenda.every('1 hour', JOB_NAME);
};
