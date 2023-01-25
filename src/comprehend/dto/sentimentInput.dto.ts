import { IsNotEmpty, IsString } from 'class-validator';

export class SentimentInputDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
