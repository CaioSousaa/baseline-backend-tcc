import { INotificationPortRepository, Notification } from '../port/INotificationPortRepository';
import { INotificationDTO } from '../dto/INotificationDTO';

export class CreateNotificationService {
  constructor(private notificationRepository: INotificationPortRepository) {}

  async execute(data: INotificationDTO): Promise<Notification> {
    const notification = await this.notificationRepository.create(data);
    return notification;
  }
}
