import * as bcrypt from 'bcrypt';
import { IUserPortRepository, User } from '../port/IUserPortRepository';
import { IUserDTO } from '../dto/IUserDTO';

export class CreateUserService {
  constructor(private userRepository: IUserPortRepository) { }

  async execute({ name, email, password }: IUserDTO): Promise<User> {
    const userAlreadyExists = await this.userRepository.getByEmail(email);

    if (userAlreadyExists) {
      throw new Error('Este e-mail já está em uso. Por favor, tente outro.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
