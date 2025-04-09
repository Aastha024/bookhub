import { IsNotEmpty, IsString } from "class-validator";

export class PostBookDto {
  @IsString()
  @IsNotEmpty()
  bookName: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}
