import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt";
import { UserModel } from "../../data/mongodb";
import { error } from "node:console";






export class AuthMiddleware {

  static validateJWT = async (req: Request, res: Response, next: NextFunction) => {

    console.log('valida jwt');

    const authorization = req.header('Authorization');
    if (!authorization) return res.status(401).json({ error: 'No token provider' })
    if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid Bearer token' });

    const token = authorization.split(' ').at(1) || '';

    try {

      // TODO
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) return res.status(401).json({ error: 'Invalid token' });

      // podemos usar un Datasource
      const user = await UserModel.findById(payload.id);
      if (!user) return res.status(400).json({ error: 'Invalid token - user not found' }) // 500

      // options
      /* 
      user isActive
      user invalidToken => generate new token
      */

      res.locals.user = user;

      next();
    } catch (error) {

      console.log(error); // logger management
      // si llega aca son errores q se investigan
      res.status(500).json({ error: 'Internal server error' })
    }

  }
}


