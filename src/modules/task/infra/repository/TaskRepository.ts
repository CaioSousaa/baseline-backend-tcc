import { TaskModel } from '../../../../infra/mongo/schemas/Task';
import { ITaskDTO } from '../../dto/ITaskDTO';
import { ITaskPortRepository, Task } from '../../port/ITaskPortRepository';

export class TaskRepository implements ITaskPortRepository {
  async create(data: ITaskDTO): Promise<Task> {
    const task = await TaskModel.create(data);
    return task as Task;
  }

  async findOne(id: string): Promise<Task | null> {
    const task = await TaskModel.findOne({ _id: id });
    return task as Task | null;
  }

  async update(id: string, data: Partial<ITaskDTO>): Promise<void> {
    await TaskModel.updateOne({ _id: id }, data);
  }

  async delete(id: string): Promise<void> {
    await TaskModel.deleteOne({ _id: id });
  }
}
