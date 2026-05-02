import { ITagPortRepository, Tag } from '../port/ITagPortRepository';
import { AppResponse } from '../../../adapters/AppResponse';
import { validateTagName, validateTagColor } from '../utils/tagValidations';

interface IUpdateTagRequest {
  id: string;
  ownerId: string;
  name?: string;
  color?: string;
}

export class UpdateTagService {
  constructor(private tagRepository: ITagPortRepository) {}

  async execute({ id, ownerId, name, color }: IUpdateTagRequest): Promise<Tag> {
    const tag = await this.tagRepository.findById(id);

    if (!tag) {
      throw new AppResponse('Tag não encontrada.', 404);
    }

    if (tag.owner.toString() !== ownerId) {
      throw new AppResponse('Você não tem permissão para editar esta tag.', 403);
    }

    const updateData: Partial<{ name: string; color: string }> = {};

    if (name) {
      const sanitizedName = name.toLowerCase();
      await validateTagName(sanitizedName, this.tagRepository, id);
      updateData.name = sanitizedName;
    }

    if (color) {
      const sanitizedColor = color.toLowerCase();
      await validateTagColor(sanitizedColor, this.tagRepository, id);
      updateData.color = sanitizedColor;
    }

    if (Object.keys(updateData).length > 0) {
      const updatedTag = await this.tagRepository.update(id, updateData);
      return updatedTag;
    }

    return tag;
  }
}
