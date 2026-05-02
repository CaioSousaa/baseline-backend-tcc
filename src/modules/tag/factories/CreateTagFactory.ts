import { TagRepository } from '../infra/repository/TagRepository';
import { CreateTagService } from '../services/CreateTag.service';
import { TagController } from '../infra/controller/TagController';

export const createTag = () => {
  const tagRepository = new TagRepository();
  const createTagService = new CreateTagService(tagRepository);
  const tagController = new TagController(createTagService);
  return tagController;
};
