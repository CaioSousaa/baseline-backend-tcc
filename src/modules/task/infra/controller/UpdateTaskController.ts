import { Request, Response } from 'express';
import { UpdateTaskService } from '../../services/UpdateTask.service';

export class UpdateTaskController {
  constructor(private updateTaskService: UpdateTaskService) { }

  async handle(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const { title, description, status, priority, dueDate, tagId, alert } = req.body;
      const ownerId = req.user?.id;

      if (!ownerId) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
      }

      const tags = tagId ? (Array.isArray(tagId) ? tagId : [tagId]) : undefined;

      await this.updateTaskService.execute({
        id,
        ownerId,
        title,
        description,
        status,
        priority,
        dueDate,
        tags,
        alert,
      });

      return res.status(200).json({ message: 'Tarefa atualizada com sucesso.' });
    } catch (error: any) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }
}
