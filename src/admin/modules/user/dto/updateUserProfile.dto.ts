import { IsIn, IsOptional, IsString, MaxLength } from "class-validator";
import { Constants } from "@configs/constants";


export class UpdateUserProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(Constants.FIRST_NAME_MAX_LENGTH)
  firstName: string;

  @IsOptional()
  @IsString()
  @MaxLength(Constants.LAST_NAME_MAX_LENGTH)
  lastName: string;

  @IsOptional()
  @IsIn(Constants.ROLE, { message: "Role must be either 'buyer' or 'seller'" })
  role: string;
}
