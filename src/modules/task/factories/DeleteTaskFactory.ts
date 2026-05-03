import { TaskRepository } from '../infra/repository/TaskRepository';
import { DeleteTaskService } from '../services/DeleteTask.service';
import { DeleteTaskController } from '../infra/controller/DeleteTaskController';

export const deleteTaskFactory = () => {
  const taskRepository = new TaskRepository();
  const deleteTaskService = new DeleteTaskService(taskRepository);
  const deleteTaskController = new DeleteTaskController(deleteTaskService);

  return deleteTaskController;
};
