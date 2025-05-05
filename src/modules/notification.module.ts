import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth.module';
import { Notification } from 'src/models/notification.model';
import { NotificationAudience } from 'src/models/notification-audience.model';
import { NotificationService } from 'src/services/notification.service';
import { NotificationController } from 'src/controllers/notification.controller';
import { NotificationSetting } from 'src/models/notification-setting.model';
import { EmailModule } from 'src/modules/email.module';
import { User } from 'src/models/user.model';
import { EmailService } from 'src/services/email.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Notification,
      NotificationAudience,
      NotificationSetting,
      User
    ]),
    AuthModule,
    // forwardRef(()=>EmailModule)
  ],
  providers: [NotificationService, EmailService],
  exports: [NotificationService, EmailService],
  controllers: [NotificationController],
})
export class NotificationModule {}
