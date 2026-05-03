import { ITaskPortRepository } from '../port/ITaskPortRepository';
import { AppResponse } from '../../../adapters/AppResponse';

export class DeleteTaskService {
  constructor(private taskRepository: ITaskPortRepository) { }

  async execute(id: string, ownerId: string): Promise<void> {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new AppResponse('Tarefa não encontrada.', 404);
    }

    if (task.owner.toString() !== ownerId) {
      throw new AppResponse('Você não tem permissão para apagar esta tarefa.', 403);
    }

    await this.taskRepository.delete(id);
  }
}
