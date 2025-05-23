import { IsBoolean, IsEmail, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Length, Matches, MaxLength } from "class-validator";
import { Constants } from "../../../configs/constants";
// import { Constants } from "@configs/constants"


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(Constants.FIRST_NAME_MAX_LENGTH)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(Constants.LAST_NAME_MAX_LENGTH)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(Constants.EMAIL_MAX_LENGTH, {message: "Please enter an email"})
  email: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).*$/, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  })
  @Length(Constants.PASSWORD_MIN_LENGTH, Constants.PASSWORD_MAX_LENGTH)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).*$/, {
    message: "Confirm Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  })
  @Length(Constants.PASSWORD_MIN_LENGTH, Constants.PASSWORD_MAX_LENGTH)
  confirmPassword: string;
}
