import { IsNotEmpty, IsNumber } from 'class-validator';

export class NotificationAudDataRequestDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  notification_id: number;
}
