import { Request, Response } from 'express';
import { MarkNotificationReadService } from '../../services/MarkNotificationRead.service';

export class MarkNotificationReadController {
  constructor(private markNotificationReadService: MarkNotificationReadService) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const owner = req.user?.id;

      if (!owner) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
      }

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'ID não informado.' });
      }

      await this.markNotificationReadService.execute(id, owner);

      return res.status(200).json({ message: 'Notificação marcada como lida.' });
    } catch (error: any) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }
}
