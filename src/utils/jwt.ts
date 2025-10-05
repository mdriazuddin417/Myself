import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secret: jwt.Secret = process.env.JWT_SECRET || 'dev_secret';

// export function signToken(payload: object, expiresIn = '7d') {
//   return jwt.sign(payload as, secret, { expiresIn });
// }

export function verifyToken<T = unknown>(token: string): T {
  return jwt.verify(token, secret) as T;
}
