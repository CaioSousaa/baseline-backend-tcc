import { Request, Response } from 'express';
import { GetNotificationsService } from '../../services/GetNotifications.service';

export class GetNotificationsController {
  constructor(private getNotificationsService: GetNotificationsService) {}

  async handle(req: Request, res: Response) {
    try {
      const owner = req.user?.id;

      if (!owner) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
      }

      const notifications = await this.getNotificationsService.execute(owner);

      return res.status(200).json(notifications);
    } catch (error: any) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }
}
