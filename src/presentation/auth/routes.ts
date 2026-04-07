import { Router } from "express"; // fastify or ...
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";






export class AuthRoutes {

  //constructor( externo ) {}

  static get routes(): Router {
    // caso contrario constructor + dependecy injection (DI)

    const router = Router();

    const datasource = new AuthDatasourceImpl()
    const repository = new AuthRepositoryImpl(datasource);

    const controller = new AuthController(repository)

    router.post('/login', controller.loginUser)
    router.post('/register', controller.registerUser)

    router.get('/', [AuthMiddleware.validateJWT], controller.getUsers);

    return router;
  }

}


