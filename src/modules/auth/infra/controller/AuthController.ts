import { Request, Response } from 'express';
import { LoginAuthService } from '../../services/LoginAuth.service';

export class AuthController {
  constructor(private loginAuthService: LoginAuthService) {}

  async handle(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await this.loginAuthService.execute({ email, password });

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}
