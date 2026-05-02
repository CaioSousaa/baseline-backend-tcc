import { TagModel } from '../../../infra/mongo/schemas/TagSchema';
import { ITagDTO } from '../dto/ITagDTO';

export type Tag = InstanceType<typeof TagModel>;

export interface ITagPortRepository {
  create(data: ITagDTO): Promise<Tag>;
  getByColor(color: string): Promise<Tag | null>;
  getByName(name: string): Promise<Tag | null>;
  findById(id: string): Promise<Tag | null>;
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<ITagDTO>): Promise<Tag>;
  findAll(ownerId: string): Promise<Tag[]>;
}
