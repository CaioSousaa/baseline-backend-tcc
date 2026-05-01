import { Router } from 'express';
import { UserController } from '../modules/user/infra/controller/UserController';

const userRoutes = Router();

const userController = new UserController();

userRoutes.post('/create', userController.handleCreateUser);

export default userRoutes;