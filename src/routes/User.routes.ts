import { Router } from 'express';
import { createUser } from '../modules/user/factories/CreateUserFactory';

const userRoutes = Router();

userRoutes.post('/create', async (req, res) => {
  return createUser().handle(req, res);
});

export { userRoutes };