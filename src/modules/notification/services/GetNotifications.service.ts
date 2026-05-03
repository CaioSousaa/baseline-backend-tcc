import { INotificationPortRepository, Notification } from '../port/INotificationPortRepository';

export class GetNotificationsService {
  constructor(private notificationRepository: INotificationPortRepository) {}

  async execute(ownerId: string): Promise<Notification[]> {
    const notifications = await this.notificationRepository.findByOwner(ownerId);
    return notifications;
  }
}
