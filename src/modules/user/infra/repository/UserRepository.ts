import { IUserPortRepository, User } from '../../port/IUserPortRepository';
import { UserModel } from '../../../../infra/mongo/schemas/UserSchema';
import { IUserDTO } from '../../dto/IUserDTO';

export class UserRepository implements IUserPortRepository {
  async create({ name, email, password }: IUserDTO): Promise<User> {
    const user = await UserModel.create({ name, email, password });
    return user;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    return user;
  }
}
