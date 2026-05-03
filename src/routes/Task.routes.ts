import { Router } from 'express';
import { createTaskFactory } from '../modules/task/factories/CreateTaskFactory';
import { ensureAuthenticateMiddleware } from '../shared/http/EnsureAuthenticateMiddleware';

const taskRoutes = Router();

taskRoutes.post('/create', ensureAuthenticateMiddleware, async (req, res) => {
  return createTaskFactory().handle(req, res);
});

export { taskRoutes };
