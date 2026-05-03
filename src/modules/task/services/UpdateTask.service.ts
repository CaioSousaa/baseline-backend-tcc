import { ITaskPortRepository } from '../port/ITaskPortRepository';
import { ITagPortRepository } from '../../tag/port/ITagPortRepository';
import { ITaskDTO } from '../dto/ITaskDTO';
import { AppResponse } from '../../../adapters/AppResponse';

interface IUpdateTaskRequest extends Partial<Omit<ITaskDTO, 'owner'>> {
  id: string;
  ownerId: string;
}

export class UpdateTaskService {
  constructor(
    private taskRepository: ITaskPortRepository,
    private tagRepository: ITagPortRepository
  ) { }

  async execute(data: IUpdateTaskRequest): Promise<void> {
    const { id, ownerId, dueDate, tags } = data;

    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new AppResponse('Tarefa não encontrada.', 404);
    }

    if (task.owner.toString() !== ownerId) {
      throw new AppResponse('Você não tem permissão para editar esta tarefa.', 403);
    }

    if (dueDate) {
      const now = new Date();
      now.setSeconds(0, 0);
      const checkDueDate = new Date(dueDate);
      checkDueDate.setSeconds(0, 0);

      if (checkDueDate < now) {
        throw new AppResponse('A data de vencimento não pode ser inferior à data de criação.', 400);
      }
    }

    if (tags && tags.length > 0) {
      for (const tagId of tags) {
        const tagExists = await this.tagRepository.findById(tagId);
        if (!tagExists) {
          throw new AppResponse(`A tag com ID ${tagId} não existe.`, 404);
        }
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ownerId: __, ...updateData } = data;

    await this.taskRepository.update(id, updateData);
  }
}
