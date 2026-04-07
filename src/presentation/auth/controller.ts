import { Request, Response } from "express"
import {
  AuthRepository, CustomError, LoginUser, LoginUserDto, RegisterUser, RegisterUserDto
} from "../../domain"
import { JwtAdapter } from "../../config/jwt";
import { UserModel } from "../../data/mongodb";






export class AuthController {

  // DI + best practice Express
  constructor(
    private readonly authRepository: AuthRepository,
  ) { }

  private handleError = (error: unknown, res: Response) => {

    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    // literal internal server error => msg para el front (open issue)
    console.log(error); // winston logger
    return res.status(500).json({ error: 'Internal Server Error' })
  }

  registerUser = (req: Request, res: Response) => {

    const [error, registerUserDto] = RegisterUserDto.create(req.body)
    if (error) return res.status(400).json({ error })

    // this.authRepository.register(registerUserDto!)
    //   .then(async user => {

    //     res.json({
    //       user,
    //       token: await JwtAdapter.generateToken({ id: user.id })
    //     })
    //   })
    //   .catch(error => this.handleError(error, res))
    // use case: register user

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  loginUser = (req: Request, res: Response) => {

    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    // dto OK + exist user OK
    // use case: authentic users OK
    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  getUsers = (req: Request, res: Response) => {

    UserModel.find()
      .then(users => res.json({
        // users,
        userDB: res.locals.user
      }))
      .catch(() => res.status(500).json({ error: 'Internal server error' }))
  }

}


