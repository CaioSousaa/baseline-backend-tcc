import * as dotenv from "dotenv";
dotenv.config();

if (!process.env.JWT_SECRET_KEY || !process.env.JWT_EXPIRES_IN) {
  throw new Error("JWT_SECRET_KEY and JWT_EXPIRES_IN must be defined in environment variables");
}

export const secret: string = process.env.JWT_SECRET_KEY;
export const expiresIn: string = process.env.JWT_EXPIRES_IN;
