import { TaskRepository } from '../infra/repository/TaskRepository';
import { TagRepository } from '../../tag/infra/repository/TagRepository';
import { UpdateTaskService } from '../services/UpdateTask.service';
import { UpdateTaskController } from '../infra/controller/UpdateTaskController';

export const updateTaskFactory = () => {
  const taskRepository = new TaskRepository();
  const tagRepository = new TagRepository();
  const updateTaskService = new UpdateTaskService(taskRepository, tagRepository);
  const updateTaskController = new UpdateTaskController(updateTaskService);
  return updateTaskController;
};
