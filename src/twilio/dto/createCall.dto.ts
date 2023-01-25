import { IsPhoneNumber } from 'class-validator';

export class CreateCallDto {
  @IsPhoneNumber()
  phone: string;
}
