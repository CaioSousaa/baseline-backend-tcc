import { Router } from 'express';
import { getNotificationsFactory } from '../modules/notification/factories/GetNotificationsFactory';
import { markNotificationReadFactory } from '../modules/notification/factories/MarkNotificationReadFactory';
import { ensureAuthenticateMiddleware } from '../shared/http/EnsureAuthenticateMiddleware';

const notificationRoutes = Router();

notificationRoutes.get('/', ensureAuthenticateMiddleware, async (req, res) => {
  return getNotificationsFactory().handle(req, res);
});

notificationRoutes.patch('/:id/read', ensureAuthenticateMiddleware, async (req, res) => {
  return markNotificationReadFactory().handle(req, res);
});

export { notificationRoutes };
