import {  Logger, Module, OnModuleInit } from '@nestjs/common';

import { KafkaConsumerService } from 'src/services/kafka.consumer.service';
import { KafkaProducerService } from 'src/services/kafka.producer.service';
import { KafkaEventsService } from 'src/services/kafka.events.service';
import { AxiosHttpService } from 'src/services/axios-http.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { EmailModule } from 'src/modules/email.module';

@Module({
  imports: [EmailModule, HttpModule],
  providers: [
    KafkaProducerService,
    KafkaConsumerService,
    KafkaEventsService,
    AxiosHttpService,
  ],
  exports: [
    KafkaProducerService,
    KafkaConsumerService,
    KafkaEventsService,
    AxiosHttpService,
  ],
})
export class CommonModule implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  private logger = new Logger(this.constructor.name);

  onModuleInit() {
    this.httpService.axiosRef.interceptors.request.use((config) => {
      this.logger.log(`Sending request to ${config.url}`);
      return config;
    });
  }
}
