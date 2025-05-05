import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class NotificationDataRequestDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsOptional()
  @IsNumber()
  business_id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  preview_content: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsOptional()
  @IsBoolean()
  is_read: boolean;
}

export class NotificationIdsDto {
  @IsNotEmpty()
  @IsArray()
  notification_ids: number[];
}
