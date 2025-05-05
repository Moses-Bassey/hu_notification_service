import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Partitioners, Producer, ProducerRecord } from 'kafkajs';
import { get_kafka_config } from 'src/config/kafka.config';

@Injectable()
export class KafkaProducerService
  implements OnModuleInit, OnApplicationShutdown
{
  // private readonly kafka = new Kafka({
  //   brokers: JSON.parse(get_kafka_config().kafka_brokers),
  // });
  // private readonly producer: Producer = this.kafka.producer({
  //   createPartitioner: Partitioners.DefaultPartitioner,
  // });

  async produce(record: ProducerRecord) {
    // await this.producer.send(record);
  }

  async onModuleInit() {
    // await this.producer.connect();
  }

  async onApplicationShutdown() {
    // await this.producer.disconnect();
  }
}
