import { TagRepository } from '../infra/repository/TagRepository';
import { UpdateTagService } from '../services/UpdateTag.service';
import { UpdateTagController } from '../infra/controller/UpdateTagController';

export const updateTag = () => {
  const tagRepository = new TagRepository();
  const updateTagService = new UpdateTagService(tagRepository);
  const updateTagController = new UpdateTagController(updateTagService);
  return updateTagController;
};
