import { ITaskPortRepository, Task } from '../port/ITaskPortRepository';

export class FindTasksService {
  constructor(private taskRepository: ITaskPortRepository) {}

  async execute(ownerId: string): Promise<Task[]> {
    const tasks = await this.taskRepository.find(ownerId);
    return tasks;
  }
}
