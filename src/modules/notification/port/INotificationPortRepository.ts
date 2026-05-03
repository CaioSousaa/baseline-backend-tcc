import { NotificationModel } from '../../../infra/mongo/schemas/NotificationSchema';
import { INotificationDTO } from '../dto/INotificationDTO';

export type Notification = InstanceType<typeof NotificationModel>;

export interface INotificationPortRepository {
  create(data: INotificationDTO): Promise<Notification>;
  findByOwner(ownerId: string): Promise<Notification[]>;
  findByTaskAndOwner(taskId: string, ownerId: string): Promise<Notification | null>;
  markAsRead(id: string): Promise<void>;
}
