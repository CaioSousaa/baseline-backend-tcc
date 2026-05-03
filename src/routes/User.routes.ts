import { Router } from 'express';
import { createUser } from '../modules/user/factories/CreateUserFactory';
import { updateUserFactory } from '../modules/user/factories/UpdateUserFactory';
import { ensureAuthenticateMiddleware } from '../shared/http/EnsureAuthenticateMiddleware';

const userRoutes = Router();

userRoutes.post('/create', async (req, res) => {
  return createUser().handle(req, res);
});

userRoutes.put('/update', ensureAuthenticateMiddleware, async (req, res) => {
  return updateUserFactory().handle(req, res);
});

export { userRoutes };