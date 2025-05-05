import { OnApplicationShutdown } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';
import { get_kafka_config } from 'src/config/kafka.config';

// @Injectable()
export class KafkaConsumerService
    implements OnApplicationShutdown
{
  // private readonly kafka = new Kafka({
  //   brokers: JSON.parse(get_kafka_config().kafka_brokers),
  // });
  // private readonly consumers: Consumer[] = [];

  async consume(topics: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    // const consumer = this.kafka.consumer({
    //   groupId: get_kafka_config().group_id,
    // });
    // await consumer.connect();
    // await consumer.subscribe(topics);
    // await consumer.run(config);
    // this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    // for (const consumer of this.consumers) {
    //   await consumer.disconnect();
    // }
  }
}
