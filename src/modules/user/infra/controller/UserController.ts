import { Request, Response } from 'express';
import { CreateUserService } from '../../services/CreateUser.service';
import { UserRepository } from '../repository/UserRepository';

export class UserController {
  async handleCreateUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const userRepository = new UserRepository();
      const createUserService = new CreateUserService(userRepository);

      const user = await createUserService.execute({ name, email, password });

      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
