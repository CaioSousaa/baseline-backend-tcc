import { UserModel } from '../../../infra/mongo/schemas/UserSchema';

export type User = InstanceType<typeof UserModel>;

export interface IAuthPortRepository {
  getByEmail(email: string): Promise<User | null>;
}
