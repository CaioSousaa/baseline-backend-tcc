import { NotificationRepository } from '../infra/repository/NotificationRepository';
import { MarkNotificationReadService } from '../services/MarkNotificationRead.service';
import { MarkNotificationReadController } from '../infra/controller/MarkNotificationReadController';

export const markNotificationReadFactory = () => {
  const notificationRepository = new NotificationRepository();
  const markNotificationReadService = new MarkNotificationReadService(notificationRepository);
  const markNotificationReadController = new MarkNotificationReadController(markNotificationReadService);
  return markNotificationReadController;
};
