import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { NotificationMeans } from 'src/types/notification-setting.type';

export class NotificationSettingRequestDto {
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @IsOptional()
  @IsBoolean()
  news_updates: boolean;

  @IsOptional()
  @IsBoolean()
  early_access: boolean;

  @IsOptional()
  @IsBoolean()
  events: boolean;

  @IsOptional()
  @IsBoolean()
  product_offers: boolean;

  @IsOptional()
  @IsBoolean()
  out_of_stock: boolean;

  @IsOptional()
  @IsBoolean()
  product_purchase: boolean;

  @IsOptional()
  @IsBoolean()
  product_tracking: boolean;

  @IsOptional()
  @IsBoolean()
  product_delivered: boolean;

  @IsOptional()
  @IsBoolean()
  sales_order: boolean;

  @IsOptional()
  @IsBoolean()
  product_complaints: boolean;

  @IsOptional()
  @IsBoolean()
  notify_invoice: boolean;

  @IsOptional()
  @IsEnum(NotificationMeans)
  receive_notifications: NotificationMeans

  @IsOptional()
  @IsBoolean()
  is_bare_bone?: boolean;
}
