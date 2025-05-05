import { registerAs } from '@nestjs/config';
import { config } from 'dotenv';

config();

const { KAFKA_BROKERS, GROUP_ID, KAFKA_TOPIC } = process.env;

export const get_kafka_config_name = () => 'kafka';

export const get_kafka_config = () => ({
  kafka_brokers: KAFKA_BROKERS,
  group_id: GROUP_ID,
  topic: KAFKA_TOPIC,
});

export default registerAs(get_kafka_config_name(), get_kafka_config);
