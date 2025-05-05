import { forwardRef, Module } from '@nestjs/common';
import { EmailController } from 'src/controllers/email.controller';
import { EmailService } from 'src/services/email.service';
import { NotificationModule } from 'src/modules/notification.module';

@Module({
  imports: [NotificationModule],
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
