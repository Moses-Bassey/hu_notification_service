import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaConsumerService } from 'src/services/kafka.consumer.service';
import { EmailService } from 'src/services/email.service';
import { KafkaEmailData } from 'src/types/types';
import { get_kafka_config } from 'src/config/kafka.config';

@Injectable()
export class KafkaEventsService
    implements OnModuleInit
{
  constructor(
    private readonly kafkaConsumer: KafkaConsumerService,
    private readonly email_service: EmailService,
  ) {}

  async onModuleInit(): Promise<any> {
    await this.kafkaConsumer.consume(
      { topics: [get_kafka_config().topic] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const data = JSON.parse(message.value.toString());
            console.log(data);
            await this.processEmails(data);
          } catch (e) {
            console.log('Error: ', e);
          }
        },
      },
    );
  }

  async processEmails(syncventory_data: KafkaEmailData) {
    let subject, body;
    switch (syncventory_data.key) {
      case 'NEW_ACCOUNT_CREATED':
        subject = 'Account Created';
        body = 'Welcome to HU learning Academy';
        break;
      case 'REQUEST_PASSWORD_RESET':
        subject = 'Password Reset Request';
        body = `We received a request for your account, kindly visit the link below`;
        break;
      case 'START_SESSION':
        subject = 'Account Disabled';
        body = `We have disabled your account as a security feature. kindly use the link below to recover: <a href="https://syncventory.nugitech.com/auth/reset-password/">HERE</a>`;
        break;
      case 'START_SESSION':
          subject = 'Class Session Started';
          body = `Your class session has just started`;
          break;
      case 'END_SESSION':
          subject = 'Class Session Ended';
          body = `Your class session has ended`;
          break;
      default:
        break;
    }
  }
}
