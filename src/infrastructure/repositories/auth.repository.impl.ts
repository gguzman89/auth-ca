import { AuthDatasource, AuthRepository, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";






export class AuthRepositoryImpl implements AuthRepository {

  constructor(
    private readonly datasource: AuthDatasource, // reglas
  ) { }


  login(loginUserDto: LoginUserDto): Promise<UserEntity> {

    return this.datasource.login(loginUserDto);
  }

  register(dto: RegisterUserDto): Promise<UserEntity> {

    return this.datasource.register(dto);
  }

}


