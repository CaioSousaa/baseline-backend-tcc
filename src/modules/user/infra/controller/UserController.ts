import { Request, Response } from 'express';
import { CreateUserService } from '../../services/CreateUser.service';

export class UserController {
  constructor(private createUserService: CreateUserService) { }

  async handle(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const user = await this.createUserService.execute({ name, email, password });

      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
