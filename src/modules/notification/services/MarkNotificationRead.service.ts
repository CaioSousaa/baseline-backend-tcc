import { INotificationPortRepository } from '../port/INotificationPortRepository';
import { AppResponse } from '../../../adapters/AppResponse';

export class MarkNotificationReadService {
  constructor(private notificationRepository: INotificationPortRepository) {}

  async execute(id: string, ownerId: string): Promise<void> {
    const notification = await this.notificationRepository.findByTaskAndOwner(id, ownerId);

    if (!notification) {
      throw new AppResponse('Notificação não encontrada.', 404);
    }

    await this.notificationRepository.markAsRead(String(notification._id));
  }
}
