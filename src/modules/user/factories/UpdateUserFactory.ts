import { UpdateUserController } from '../infra/controller/UpdateUserController';
import { UpdateUserService } from '../services/UpdateUser.service';
import { UserRepository } from '../infra/repository/UserRepository';

export const updateUserFactory = () => {
  const userRepository = new UserRepository();
  const updateUserService = new UpdateUserService(userRepository);
  return new UpdateUserController(updateUserService);
};
