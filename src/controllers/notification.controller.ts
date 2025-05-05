import {
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ResponseData } from 'src/dto/response/data.response.dto';
import { INotification } from 'src/types/notification.type';
import { NotificationService } from 'src/services/notification.service';
import { GetUser } from 'src/decorators/get.user.decorator';
import { IAuthUser } from 'src/types/types';
import {
  NotificationDataRequestDto,
  NotificationIdsDto,
} from 'src/dto/request/notification.data.request.dto';
import { INotificationAudience } from 'src/types/notification-audience.type';
import { NotificationSettingRequestDto } from 'src/dto/request/notification-setting.request.dto';

@Controller('nn')
export class NotificationController {
  constructor(private _service: NotificationService) {}

  @UseGuards(JwtAuthGuard)
  @Put('mark-read/:notification_id')
  @HttpCode(HttpStatus.CREATED)
  async mark_as_read(
    @Param() param: { notification_id: number },
    @GetUser() user: IAuthUser,
  ): Promise<ResponseData<INotificationAudience>> {
    const result = await this._service.update_notification_aud_by_id(
      { active: false },
      param.notification_id,
    );
    return {
      status: HttpStatus.OK,
      message: 'Notification marked read successfully',
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async get_user_notifications(
    @GetUser() user: IAuthUser,
  ): Promise<ResponseData<INotification>> {
    const result = await this._service.get_notification({
      user_id: user.sub,
    });
    return {
      status: HttpStatus.OK,
      message: 'Notifications fetched successfully',
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('read-notifications')
  @HttpCode(HttpStatus.CREATED)
  async mark_read(
    @Body() notification_dto: NotificationIdsDto,
  ): Promise<ResponseData<INotification>> {
    const result = await this._service.update_bulk_notification_by_id(
      { is_read: true },
      notification_dto.notification_ids,
    );
    return {
      status: HttpStatus.OK,
      message: 'Notification marked read successfully',
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  @HttpCode(HttpStatus.OK)
  async delete_by_id(
    @Body() notification_dto: NotificationIdsDto,
  ): Promise<ResponseData<null>> {
    await this._service.delete_notification(notification_dto.notification_ids);
    return {
      status: HttpStatus.OK,
      message: 'notification removed successfully',
      data: null,
    };
  }
}
