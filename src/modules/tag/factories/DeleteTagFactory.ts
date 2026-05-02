import { TagRepository } from '../infra/repository/TagRepository';
import { DeleteTagService } from '../services/DeleteTag.service';
import { DeleteTagController } from '../infra/controller/DeleteTagController';

export const deleteTag = () => {
  const tagRepository = new TagRepository();
  const deleteTagService = new DeleteTagService(tagRepository);
  const deleteTagController = new DeleteTagController(deleteTagService);
  return deleteTagController;
};
