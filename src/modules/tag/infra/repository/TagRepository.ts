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

  async getByName(name: string): Promise<Tag | null> {
    const tag = await TagModel.findOne({ name });
    return tag;
  }

  async findById(id: string): Promise<Tag | null> {
    const tag = await TagModel.findById(id);
    return tag;
  }

  async delete(id: string): Promise<void> {
    await TagModel.deleteOne({ _id: id });
  }

  async update(id: string, data: Partial<ITagDTO>): Promise<Tag> {
    const updatedTag = await TagModel.findByIdAndUpdate(id, data, { new: true });
    return updatedTag as Tag;
  }

  async findAll(ownerId: string): Promise<Tag[]> {
    const tags = await TagModel.find({ owner: ownerId });
    return tags;
  }
}
