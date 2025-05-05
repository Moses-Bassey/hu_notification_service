import { Module } from '@nestjs/common';
import { WebhookController } from 'src/controllers/webhook.controller';
import { WebhookService } from 'src/services/webhook.service';
import { TransactionProcessorService } from 'src/services/providers/transaction.processor.service';
import { CustomerProcessorService } from 'src/services/providers/customer.processor.service';
import { MonnifyProcessorService } from 'src/services/providers/monnify.processor.service';
import { RelatedService } from 'src/services/related.service';
import { CommonModule } from 'src/modules/common.module';
import { ApplicationDefaultSetting } from 'src/models/application.default.setting.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    // SequelizeModule.forFeature([
    //   Notification,
    //   NotificationAudience,
    //   NotificationSetting,
    // ]),
    // AuthModule,
    SequelizeModule.forFeature([ApplicationDefaultSetting]),
    CommonModule,
  ],
  providers: [
    WebhookService,
    TransactionProcessorService,
    CustomerProcessorService,
    MonnifyProcessorService,
    RelatedService,
  ],
  exports: [WebhookService],
  controllers: [WebhookController],
})
export class WebhookModule {}
