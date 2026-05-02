import { UserController } from '../infra/controller/UserController';
import { CreateUserService } from '../services/CreateUser.service';
import { UserRepository } from '../infra/repository/UserRepository';

export const createUser = () => {
  const userRepository = new UserRepository();
  const createUserService = new CreateUserService(userRepository);
  return new UserController(createUserService);
};
