import { Request, Response } from 'express';
import { DeleteTaskService } from '../../services/DeleteTask.service';

export class DeleteTaskController {
  constructor(private deleteTaskService: DeleteTaskService) { }

  async handle(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const ownerId = req.user?.id;

      if (!ownerId) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
      }

      await this.deleteTaskService.execute(id, ownerId);

      return res.status(204).send();
    } catch (error: any) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }
}
