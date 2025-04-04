import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Constants } from "../../../config/constants";

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(Constants.EMAIL_MAX_LENGTH)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(Constants.PASSWORD_MAX_LENGTH)
  password: string;
}
