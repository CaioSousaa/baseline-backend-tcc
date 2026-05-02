import { ITagPortRepository, Tag } from '../../port/ITagPortRepository';
import { TagModel } from '../../../../infra/mongo/schemas/TagSchema';
import { ITagDTO } from '../../dto/ITagDTO';

export class TagRepository implements ITagPortRepository {
  async create({ name, color, owner }: ITagDTO): Promise<Tag> {
    const tag = await TagModel.create({ name, color, owner });
    return tag;
  }

  async getByColor(color: string): Promise<Tag | null> {
    const tag = await TagModel.findOne({ color });
    return tag;
  }
}
