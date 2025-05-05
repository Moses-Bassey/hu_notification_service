import { IAuditable } from 'src/types/auditable.type';
import { INotification } from 'src/types/notification.type';

export interface INotificationAudience extends IAuditable {
  id: number;
  uuid?: string;
  user_id: number;
  notification?: INotification;
  notification_id: number;
}
