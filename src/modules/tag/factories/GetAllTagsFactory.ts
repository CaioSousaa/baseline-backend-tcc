import { TagRepository } from '../infra/repository/TagRepository';
import { GetAllTagsService } from '../services/GetAllTags.service';
import { GetAllTagsController } from '../infra/controller/GetAllTagsController';

export const getAllTags = () => {
  const tagRepository = new TagRepository();
  const getAllTagsService = new GetAllTagsService(tagRepository);
  const getAllTagsController = new GetAllTagsController(getAllTagsService);
  return getAllTagsController;
};
