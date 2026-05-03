import { UserModel } from '../../../infra/mongo/schemas/UserSchema';
import { IUserDTO } from '../dto/IUserDTO';

export type User = InstanceType<typeof UserModel>;

export interface IUserPortRepository {
  create({ name, email, password }: IUserDTO): Promise<User>;
  getByEmail(email: string): Promise<User | null>;
  getById(id: string): Promise<User | null>;
  update(id: string, data: Partial<IUserDTO>): Promise<User | null>;
}
