import { type SignOptions } from 'jsonwebtoken';
import { AuthRepository } from "../../repositories/auth.repository";
import { CustomError, LoginUserDto } from '../..';
import { JwtAdapter } from '../../../config/jwt';


interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  }
}

type SignToken = (payload: Object, duration?: number | SignOptions['expiresIn']) => Promise<string | null>;

interface LoginUserUseCase {

  execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}


export class LoginUser implements LoginUserUseCase {

  constructor(
    private readonly auhtRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
  ) { }

  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {

    // get user
    const user = await this.auhtRepository.login(loginUserDto);

    // token
    const token = await this.signToken({ id: user.id }, '2h');
    if (!token) throw CustomError.internalServer('Error generating token');

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  }

}


