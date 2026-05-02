import { Request, Response } from 'express';
import { DeleteTagService } from '../../services/DeleteTag.service';

export class DeleteTagController {
  constructor(private deleteTagService: DeleteTagService) { }

  async handle(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const ownerId = req.user?.id;

      if (!ownerId) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
      }

      await this.deleteTagService.execute(id, ownerId);

      return res.status(204).send();
    } catch (error: any) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }
}
