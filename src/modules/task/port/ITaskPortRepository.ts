import { TaskModel } from '../../../infra/mongo/schemas/Task';
import { ITaskDTO } from '../dto/ITaskDTO';

export type Task = InstanceType<typeof TaskModel>;

export interface ITaskPortRepository {
  create(data: ITaskDTO): Promise<Task>;
  findOne(id: string): Promise<Task | null>;
  update(id: string, data: Partial<ITaskDTO>): Promise<void>;
  delete(id: string): Promise<void>;
}
