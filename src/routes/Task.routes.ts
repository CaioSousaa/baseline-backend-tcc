import { Router } from 'express';
import { createTaskFactory } from '../modules/task/factories/CreateTaskFactory';
import { updateTaskFactory } from '../modules/task/factories/UpdateTaskFactory';
import { deleteTaskFactory } from '../modules/task/factories/DeleteTaskFactory';
import { ensureAuthenticateMiddleware } from '../shared/http/EnsureAuthenticateMiddleware';

const taskRoutes = Router();

taskRoutes.post('/create', ensureAuthenticateMiddleware, async (req, res) => {
  return createTaskFactory().handle(req, res);
});

taskRoutes.put('/:id', ensureAuthenticateMiddleware, async (req, res) => {
  return updateTaskFactory().handle(req, res);
});

taskRoutes.delete('/:id', ensureAuthenticateMiddleware, async (req, res) => {
  return deleteTaskFactory().handle(req, res);
});

export { taskRoutes };
