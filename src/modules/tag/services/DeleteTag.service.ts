import { ITagPortRepository } from '../port/ITagPortRepository';
import { AppResponse } from '../../../adapters/AppResponse';

export class DeleteTagService {
  constructor(private tagRepository: ITagPortRepository) {}

  async execute(id: string, ownerId: string): Promise<void> {
    const tag = await this.tagRepository.findById(id);

    if (!tag) {
      throw new AppResponse('Tag não encontrada.', 404);
    }

    if (tag.owner.toString() !== ownerId) {
      throw new AppResponse('Você não tem permissão para deletar esta tag.', 403);
    }

    await this.tagRepository.delete(id);
  }
}
