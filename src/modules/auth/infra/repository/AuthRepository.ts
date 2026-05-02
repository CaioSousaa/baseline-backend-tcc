import { IAuthPortRepository, User } from '../../port/IAuthPortRepository';
import { UserModel } from '../../../../infra/mongo/schemas/UserSchema';

export class AuthRepository implements IAuthPortRepository {
  async getByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    return user;
  }
}
