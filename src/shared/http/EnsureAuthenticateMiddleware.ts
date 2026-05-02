import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { secret } from "../../config/jwt/config.jwt";
import { AppResponse } from "../../adapters/AppResponse";

interface ITokenPayload {
  iat: number;
  exp: number;
  id: string;
  name: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
      };
    }
  }
}

export function ensureAuthenticateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json(new AppResponse("JWT token is missing", 401));
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json(new AppResponse("JWT token is missing", 401));
  }

  try {
    const decoded = verify(token, secret) as unknown as ITokenPayload;

    const { id, email, name } = decoded;
    req.user = { id, email, name };

    return next();
  } catch (err) {
    return res.status(401).json(new AppResponse("Invalid JWT Token", 401));
  }
}
