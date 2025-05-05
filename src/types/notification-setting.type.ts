import { IAuditable } from 'src/types/auditable.type';

export enum NotificationMeans {
  EMAIL = 'email',
  CUSTOMER_SUPPORT = 'customer_support'
}

export interface INotificationSetting extends IAuditable {
  id: number;
  uuid?: string;
  user_id: number;
  news_updates: boolean;
  early_access: boolean;
  events: boolean;
  product_offers: boolean;
  out_of_stock: boolean;
  product_purchase: boolean;
  product_tracking: boolean;
  product_delivered: boolean;
  sales_order: boolean;
  product_complaints: boolean;
  notify_invoice: boolean;
  receive_notifications: string;
}
