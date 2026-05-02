import { ITagPortRepository, Tag } from '../port/ITagPortRepository';
import { ITagDTO } from '../dto/ITagDTO';
import { AppResponse } from '../../../adapters/AppResponse';

export class CreateTagService {
  constructor(private tagRepository: ITagPortRepository) { }

  async execute({ name, color, owner }: ITagDTO): Promise<Tag> {
    const sanitizedName = name.toLowerCase();
    const sanitizedColor = color.toLowerCase();

    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (!hexColorRegex.test(sanitizedColor)) {
      throw new AppResponse('Invalid color format. Must be a hexadecimal color.', 400);
    }

    const tagAlreadyExists = await this.tagRepository.getByColor(sanitizedColor);

    if (tagAlreadyExists) {
      throw new AppResponse('Já existe uma tag cadastrada com essa cor.', 400);
    }

    const tag = await this.tagRepository.create({
      name: sanitizedName,
      color: sanitizedColor,
      owner,
    });

    return tag;
  }
}
