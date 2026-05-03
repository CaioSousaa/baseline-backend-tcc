import { NotificationModel } from '../../../../infra/mongo/schemas/NotificationSchema';
import { INotificationDTO } from '../../dto/INotificationDTO';
import { INotificationPortRepository, Notification } from '../../port/INotificationPortRepository';

export class NotificationRepository implements INotificationPortRepository {
  async create(data: INotificationDTO): Promise<Notification> {
    const notification = await NotificationModel.create(data);
    return notification as Notification;
  }

  async findByOwner(ownerId: string): Promise<Notification[]> {
    const notifications = await NotificationModel.find({ owner: ownerId })
      .sort({ createdAt: -1 })
      .populate('task', 'title dueDate');
    return notifications as Notification[];
  }

  async findByTaskAndOwner(taskId: string, ownerId: string): Promise<Notification | null> {
    const notification = await NotificationModel.findOne({ task: taskId, owner: ownerId });
    return notification as Notification | null;
  }

  async markAsRead(id: string): Promise<void> {
    await NotificationModel.updateOne({ _id: id }, { read: true });
  }
}
