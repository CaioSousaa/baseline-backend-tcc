import { ITagPortRepository, Tag } from '../port/ITagPortRepository';
import { ITagDTO } from '../dto/ITagDTO';
import { validateTagName, validateTagColor } from '../utils/tagValidations';

export class CreateTagService {
  constructor(private tagRepository: ITagPortRepository) { }

  async execute({ name, color, owner }: ITagDTO): Promise<Tag> {
    const sanitizedName = name.toLowerCase();
    const sanitizedColor = color.toLowerCase();

    await validateTagName(sanitizedName, this.tagRepository);
    await validateTagColor(sanitizedColor, this.tagRepository);

    const tag = await this.tagRepository.create({
      name: sanitizedName,
      color: sanitizedColor,
      owner,
    });

    return tag;
  }
}
