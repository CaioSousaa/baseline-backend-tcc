import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import type { StringValue } from 'ms';
import { IAuthPortRepository, User } from '../port/IAuthPortRepository';
import { IAuthDTO } from '../dto/IAuthDTO';
import { secret, expiresIn } from '../../../config/jwt/config.jwt';

export class LoginAuthService {
  constructor(private authRepository: IAuthPortRepository) { }

  async execute({ email, password }: IAuthDTO): Promise<{ user: Partial<User>; token: string }> {
    const user = await this.authRepository.getByEmail(email);

    if (!user) {
      throw new Error('E-mail ou senha incorretos.');
    }

    if (!password) {
      throw new Error('A senha é obrigatória.');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('E-mail ou senha incorretos.');
    }

    if (!secret) {
      throw new Error('A chave secreta do JWT (JWT_SECRET_KEY) não está configurada no ambiente.');
    }

    const token = sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      secret,
      {
        expiresIn: expiresIn as StringValue,
      }
    );

    const userReturn = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return { user: userReturn, token };
  }
}
