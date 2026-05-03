import { Request, Response } from 'express';
import { UpdateUserService } from '../../services/UpdateUser.service';

export class UpdateUserController {
  constructor(private updateUserService: UpdateUserService) { }

  async handle(req: Request, res: Response) {
    try {
      const id = req.user?.id;
      const { name, email, password } = req.body;

      if (!id) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
      }

      const user = await this.updateUserService.execute(id, { name, email, password });

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
