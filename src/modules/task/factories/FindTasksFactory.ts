import { TaskRepository } from '../infra/repository/TaskRepository';
import { FindTasksService } from '../services/FindTasks.service';
import { FindTasksController } from '../infra/controller/FindTasksController';

export const findTasksFactory = () => {
  const taskRepository = new TaskRepository();
  const findTasksService = new FindTasksService(taskRepository);
  const findTasksController = new FindTasksController(findTasksService);
  return findTasksController;
};
