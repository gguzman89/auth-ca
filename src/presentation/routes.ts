import { Router } from "express"; // fastify or ...
import { AuthRoutes } from "./auth/routes";






export class AppRoutes {

  //constructor( externo ) {}

  static get routes(): Router {
    // caso contrario constructor + dependecy injection (DI)

    const router = Router();

    router.use('/api/auth', AuthRoutes.routes)
    // router.use('/api/user')
    // router.use('/api/products')
    // router.use('/api/clients')
    // router.use('/api/orders')

    return router;
  }

}


