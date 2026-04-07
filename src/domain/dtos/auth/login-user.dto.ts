import { Validators } from "../../../config";






export class LoginUserDto {

  private constructor(
    public email: string,
    public password: string,
  ) { }

  static create(obj: { [key: string]: any }): [string?, LoginUserDto?] {

    const { email, password } = obj;

    if (!email) return ['Missing email'];
    if (!Validators.email.test(email)) return ['Email is not valid'];
    if (!password) return ['Missing password']
    if (password.length < 6) return ['Password to short']

    return [undefined, new LoginUserDto(email, password)]
  }

}