import { compareSync, hashSync } from "bcryptjs";






export class BcriptAdapter {

  static hash(password: string): string {

    return hashSync(password);
  }

  static compare(password: string, hashed: string): boolean {

    return compareSync(password, hashed);
  }
}


