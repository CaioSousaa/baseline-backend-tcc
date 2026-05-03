import { TaskModel } from '../../../../infra/mongo/schemas/Task';
import { ITaskDTO } from '../../dto/ITaskDTO';
import { ITaskPortRepository, Task } from '../../port/ITaskPortRepository';

export class TaskRepository implements ITaskPortRepository {
  async create(data: ITaskDTO): Promise<Task> {
    const task = await TaskModel.create(data);
    return task as Task;
  }
}
