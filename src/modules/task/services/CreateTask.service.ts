import { ITaskPortRepository, Task } from '../port/ITaskPortRepository';
import { ITagPortRepository } from '../../tag/port/ITagPortRepository';
import { ITaskDTO } from '../dto/ITaskDTO';
import { AppResponse } from '../../../adapters/AppResponse';

export class CreateTaskService {
  constructor(
    private taskRepository: ITaskPortRepository,
    private tagRepository: ITagPortRepository
  ) { }

  async execute(data: ITaskDTO): Promise<Task> {
    const { dueDate, tags } = data;

    const now = new Date();
    now.setSeconds(0, 0);
    const checkDueDate = new Date(dueDate);
    checkDueDate.setSeconds(0, 0);

    if (checkDueDate < now) {
      throw new AppResponse('A data de vencimento não pode ser inferior à data de criação.', 400);
    }

    if (tags && tags.length > 0) {
      for (const tagId of tags) {
        const tagExists = await this.tagRepository.findById(tagId);
        if (!tagExists) {
          throw new AppResponse(`A tag com ID ${tagId} não existe.`, 404);
        }
      }
    }

    const taskData = {
      ...data,
      status: data.status || 'todo',
      priority: data.priority || 'low',
    };

    const task = await this.taskRepository.create(taskData);

    return task;
  }
}
