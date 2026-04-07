import { Validators } from "../../../config";






export class RegisterUserDto {

  // evitar mal uso
  private constructor(
    public name: string,
    public email: string,
    public password: string,
  ) { }

  static create(obj: { [key: string]: any }): [string?, RegisterUserDto?] {

    // option B: library w/ checks
    const { name, email, password } = obj;

    if (!name) return ['Missing name'];
    if (!email) return ['Missing email'];
    if (!Validators.email.test(email)) return ['Email is not valid'];
    if (!password) return ['Missing password']
    if (password.length < 6) return ['Password to short']

    return [
      undefined,
      new RegisterUserDto(name, email, password)
    ]
  }
}


