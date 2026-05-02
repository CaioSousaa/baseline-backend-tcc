import { Router } from 'express';
import { loginAuth } from '../modules/auth/factories/LoginAuthFactory';

const authRoutes = Router();

authRoutes.post('/login', async (req, res) => {
  return loginAuth().handle(req, res);
});

export { authRoutes };
