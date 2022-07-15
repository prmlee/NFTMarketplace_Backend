import { IsAlphanumeric } from "class-validator";

export class AuthParam {
  @IsAlphanumeric()
  wallet: string;

  @IsAlphanumeric()
  token: string;

  @IsAlphanumeric()
  signature: string;
}
