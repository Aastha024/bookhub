import { IsNotEmpty, IsString } from "class-validator";


export class userRoleDto {
  @IsString()
  @IsNotEmpty()
  role: string;

}
