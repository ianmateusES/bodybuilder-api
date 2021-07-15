import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { jwt } from '@config/auth';

import { AppError } from '../../../errors/AppError';

interface ITockenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, jwt.secret) as ITockenPayload;

    req.user = {
      id: user_id,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}

export { ensureAuthenticated };
