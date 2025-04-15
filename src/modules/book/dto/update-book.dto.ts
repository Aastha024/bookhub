import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  price: number;
}
