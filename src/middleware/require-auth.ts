import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource, env } from '@/config';
import { User } from '@/entities';


interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const token = authHeader.split(' ')[1];

    const payload = jwt.verify(
      token,
      env.JWT_SECRET
    ) as JwtPayload;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: payload.id } });

    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    req.currentUser = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized' });
  }
}; 