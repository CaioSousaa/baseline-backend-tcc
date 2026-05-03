import { Request, Response } from 'express';
import { FindTasksService } from '../../services/FindTasks.service';

export class FindTasksController {
  constructor(private findTasksService: FindTasksService) {}

  async handle(req: Request, res: Response) {
    try {
      const ownerId = req.user?.id;

      if (!ownerId) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
      }

      const tasks = await this.findTasksService.execute(ownerId);

      return res.status(200).json(tasks);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
