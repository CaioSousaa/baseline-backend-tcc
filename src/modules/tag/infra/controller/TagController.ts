import { Request, Response } from 'express';
import { CreateTagService } from '../../services/CreateTag.service';

export class TagController {
  constructor(private createTagService: CreateTagService) { }

  async handle(req: Request, res: Response) {
    try {
      const { name, color } = req.body;
      const owner = req.user?.id;

      if (!owner) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
      }

      const tag = await this.createTagService.execute({ name, color, owner });

      return res.status(201).json(tag);
    } catch (error: any) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }
}
