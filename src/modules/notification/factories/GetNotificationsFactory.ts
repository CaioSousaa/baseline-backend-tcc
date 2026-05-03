import { NotificationRepository } from '../infra/repository/NotificationRepository';
import { GetNotificationsService } from '../services/GetNotifications.service';
import { GetNotificationsController } from '../infra/controller/GetNotificationsController';

export const getNotificationsFactory = () => {
  const notificationRepository = new NotificationRepository();
  const getNotificationsService = new GetNotificationsService(notificationRepository);
  const getNotificationsController = new GetNotificationsController(getNotificationsService);
  return getNotificationsController;
};
