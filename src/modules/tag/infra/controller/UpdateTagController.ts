import { Request, Response } from 'express';
import { UpdateTagService } from '../../services/UpdateTag.service';

export class UpdateTagController {
  constructor(private updateTagService: UpdateTagService) { }

  async handle(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const { name, color } = req.body;
      const ownerId = req.user?.id;

      if (!ownerId) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
      }

      const updatedTag = await this.updateTagService.execute({ id, ownerId, name, color });

      return res.status(200).json(updatedTag);
    } catch (error: any) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }
}
