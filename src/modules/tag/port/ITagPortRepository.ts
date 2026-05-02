import { TagModel } from '../../../infra/mongo/schemas/TagSchema';
import { ITagDTO } from '../dto/ITagDTO';

export type Tag = InstanceType<typeof TagModel>;

export interface ITagPortRepository {
  create(data: ITagDTO): Promise<Tag>;
  getByColor(color: string): Promise<Tag | null>;
}
