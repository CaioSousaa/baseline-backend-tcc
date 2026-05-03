import { TaskRepository } from '../infra/repository/TaskRepository';
import { TagRepository } from '../../tag/infra/repository/TagRepository';
import { CreateTaskService } from '../services/CreateTask.service';
import { TaskController } from '../infra/controller/TaskController';

export const createTaskFactory = () => {
  const taskRepository = new TaskRepository();
  const tagRepository = new TagRepository();
  const createTaskService = new CreateTaskService(taskRepository, tagRepository);
  const createTaskController = new TaskController(createTaskService);
  return createTaskController;
};
