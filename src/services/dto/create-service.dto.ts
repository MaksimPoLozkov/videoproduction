import { IsString, IsNumber, Length } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @Length(5, 255)
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;
}
