import { AuthController } from '../infra/controller/AuthController';
import { LoginAuthService } from '../services/LoginAuth.service';
import { AuthRepository } from '../infra/repository/AuthRepository';

export const loginAuth = () => {
  const authRepository = new AuthRepository();
  const loginAuthService = new LoginAuthService(authRepository);
  return new AuthController(loginAuthService);
};
