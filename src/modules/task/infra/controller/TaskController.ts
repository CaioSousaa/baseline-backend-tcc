import { Request, Response } from 'express';
import { CreateTaskService } from '../../services/CreateTask.service';

export class TaskController {
  constructor(private createTaskService: CreateTaskService) { }

  async handle(req: Request, res: Response) {
    try {
      const { title, description, status, priority, dueDate, tagId, alert } = req.body;
      const owner = req.user?.id;

      if (!owner) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
      }

      const tags = Array.isArray(tagId) ? tagId : (tagId ? [tagId] : []);

      const task = await this.createTaskService.execute({
        title,
        description,
        status,
        priority,
        dueDate,
        owner,
        tags,
        alert,
      });

      return res.status(201).json(task);
    } catch (error: any) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }
}
