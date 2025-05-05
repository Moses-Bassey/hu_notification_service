import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class SendEmailRequestDto {
  // @IsNotEmpty()
  // @IsNumber()
  // user_id: number;
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'number' ? [value] : value))
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true }) // Ensures all elements are numbers
  user_id: number[];

  @IsOptional()
  @IsNumber()
  business_id: number;

  // @IsNotEmpty()
  // @IsString()
  // to: string;
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value)) // Convert string to array
  @IsArray()
  @ArrayNotEmpty()
  @IsEmail({}, { each: true }) // Ensure all elements are valid emails
  to: string[];

  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  key: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  html?: string;

  @IsOptional()
  @IsString()
  meta?: string;
}
