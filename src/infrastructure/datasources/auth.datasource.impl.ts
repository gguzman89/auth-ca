import { BcriptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";



type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;


export class AuthDatasourceImpl implements AuthDatasource {

  constructor(
    private readonly hashPassword: HashFunction = BcriptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcriptAdapter.compare,
  ) { }


  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {

    const { email, password } = loginUserDto;

    try {

      // 1 verificar email
      const exist = await UserModel.findOne({ email });
      if (!exist) throw CustomError.badRequest('User dont exists');

      const user = UserMapper.userEntityFromObject(exist!);

      // 2 verify pwd
      const verified = this.comparePassword(password, user.password)
      if (!verified) throw CustomError.badRequest('User or pwd wrong');

      return user;

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer()
    }

  }

  async register(dto: RegisterUserDto): Promise<UserEntity> {

    const { name, email, password } = dto;

    try {

      // 1 verificar email
      const exist = await UserModel.findOne({ email });
      // msg error generico
      if (exist) throw CustomError.badRequest('User already exists')

      // 2 hash pwd
      const user = await UserModel.create({
        name: name,
        email: email,
        password: this.hashPassword(password),
      });

      await user.save();

      // 3 mapper entity
      return UserMapper.userEntityFromObject(user);

    } catch (error) {

      if (error instanceof CustomError) {
        throw error;
      }
      // verificar, NO estoy esperando q esto suceda
      throw CustomError.internalServer();
    }
  }

}


