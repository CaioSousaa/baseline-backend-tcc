import { Request, Response } from 'express';
import { GetAllTagsService } from '../../services/GetAllTags.service';

export class GetAllTagsController {
  constructor(private getAllTagsService: GetAllTagsService) {}

  async handle(req: Request, res: Response) {
    try {
      const ownerId = req.user?.id;

      if (!ownerId) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
      }

      const tags = await this.getAllTagsService.execute(ownerId);

      return res.status(200).json(tags);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
