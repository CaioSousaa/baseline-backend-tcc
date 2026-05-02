import { ITagPortRepository, Tag } from '../port/ITagPortRepository';

export class GetAllTagsService {
  constructor(private tagRepository: ITagPortRepository) {}

  async execute(ownerId: string): Promise<Tag[]> {
    const tags = await this.tagRepository.findAll(ownerId);
    return tags;
  }
}
