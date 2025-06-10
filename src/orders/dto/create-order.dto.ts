import { 
  IsNotEmpty, 
  IsString, 
  IsPhoneNumber, 
  IsNumber,
  IsOptional 
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber() // Проверяет корректность номера телефона
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  serviceId: number;

  @IsOptional()
  @IsString()
  description?: string;
}
