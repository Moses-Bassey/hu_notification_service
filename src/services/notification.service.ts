import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from 'src/models/notification.model';
import { INotification } from 'src/types/notification.type';
import { INotificationAudience } from 'src/types/notification-audience.type';
import { NotificationAudience } from 'src/models/notification-audience.model';
import { NotificationDataRequestDto } from 'src/dto/request/notification.data.request.dto';
import { NotificationAudDataRequestDto } from 'src/dto/request/notification.aud.data.request.dto';
import { NotificationSettingRequestDto } from 'src/dto/request/notification-setting.request.dto';
import { NotificationSetting } from 'src/models/notification-setting.model';
import { INotificationSetting } from 'src/types/notification-setting.type';
import { User } from 'src/models/user.model';
import { EmailService } from 'src/services/email.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification)
    private notification_model: typeof Notification,
    @InjectModel(NotificationAudience)
    private notification_audience_model: typeof NotificationAudience,
    @InjectModel(NotificationSetting)
    private notification_setting_model: typeof NotificationSetting,
    @InjectModel(User)
    private user_model: typeof User,
    @Inject(forwardRef(() => EmailService))
    private readonly email_service: EmailService
  ) {}

  async create_notification(
    notification_data: NotificationDataRequestDto,
  ): Promise<INotification> {
    const notify_data = notification_data;
    const user_id = notification_data.user_id;
    // delete notify_data.user_id;
    const notification = await this.notification_model.create({
      ...notification_data,
      active: true,
    });
    return notification;
  }


  async get_notifications(filter?: any): Promise<INotification[]> {
    return await this.notification_model.findAll({ where: filter });
  }

  async get_notification_setting(filter?: any): Promise<INotificationSetting> {
    return await this.notification_setting_model.findOne({ where: filter });
  }

  async update_notification_by_id(
    notification_data: any,
    notification_ids: number,
  ): Promise<INotification> {
    const result = await this.notification_model.update(notification_data, {
      where: {
        id: notification_ids,
      },
      returning: true,
    });
    return result[1][0];
  }

  async update_bulk_notification_by_id(
    notification_data: any,
    notification_ids: number[],
  ): Promise<INotification> {
    const result = await this.notification_model.update(notification_data, {
      where: {
        id: notification_ids,
      },
      returning: true,
    });
    return result[1][0];
  }

  async get_notification(filter?:any): Promise<INotification[]> {
    return await this.notification_model.findAll({ where: filter });
  }

  async update_notification_aud_by_id(
    notification_data: any,
    notification_audience_id: number,
  ): Promise<INotificationAudience> {
    const result = await this.notification_audience_model.update(
      notification_data,
      {
        where: {
          id: notification_audience_id,
        },
        returning: true,
      },
    );
    return result[1][0];
  }

  async delete_notification(
    notification_ids: number[],
  ) {
    await this.notification_model.destroy({where: {id: notification_ids}})
  }
}
