import { LoginUserDto, RegisterUserDto } from "..";
import { UserEntity } from "../entities/user.entity";






export abstract class AuthRepository {

    // abstrac: solo se usa para expandir o implementarla
    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

    abstract register(dto: RegisterUserDto): Promise<UserEntity>
}


