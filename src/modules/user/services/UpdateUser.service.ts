import * as bcrypt from 'bcrypt';
import { IUserPortRepository, User } from '../port/IUserPortRepository';
import { IUserDTO } from '../dto/IUserDTO';

export class UpdateUserService {
  constructor(private userRepository: IUserPortRepository) { }

  async execute(id: string, { name, email, password }: Partial<IUserDTO>): Promise<User> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const updateData: Partial<IUserDTO> = {};

    if (name) {
      updateData.name = name;
    }

    if (email && email !== user.email) {
      const emailAlreadyInUse = await this.userRepository.getByEmail(email);

      if (emailAlreadyInUse) {
        throw new Error('Este e-mail já está em uso. Por favor, tente outro.');
      }
      updateData.email = email;
    }

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await this.userRepository.update(id, updateData);

    if (!updatedUser) {
      throw new Error('Erro ao atualizar o usuário.');
    }

    return updatedUser;
  }
}
