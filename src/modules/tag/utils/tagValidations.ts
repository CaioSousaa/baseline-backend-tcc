import { AppResponse } from '../../../adapters/AppResponse';
import { ITagPortRepository } from '../port/ITagPortRepository';

export async function validateTagName(name: string, tagRepository: ITagPortRepository, currentTagId?: string): Promise<void> {
  if (name.length > 30) {
    throw new AppResponse('O nome da tag não pode ter mais que 30 caracteres.', 400);
  }

  const tagAlreadyExists = await tagRepository.getByName(name);

  if (tagAlreadyExists && tagAlreadyExists.id !== currentTagId) {
    throw new AppResponse('Já existe uma tag cadastrada com esse nome.', 400);
  }
}

export async function validateTagColor(color: string, tagRepository: ITagPortRepository, currentTagId?: string): Promise<void> {
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

  if (!hexColorRegex.test(color)) {
    throw new AppResponse('Invalid color format. Must be a hexadecimal color.', 400);
  }

  const tagAlreadyExists = await tagRepository.getByColor(color);

  if (tagAlreadyExists && tagAlreadyExists.id !== currentTagId) {
    throw new AppResponse('Já existe uma tag cadastrada com essa cor.', 400);
  }
}
