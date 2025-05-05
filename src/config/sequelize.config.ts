import { registerAs } from '@nestjs/config';
import { Dialect } from 'sequelize/types';
import { isProduction } from 'src/utils/environment.utils';
import { config } from 'dotenv';
import { Transaction } from 'sequelize';
import TYPES = Transaction.TYPES;

config();

const sql_dialect = process.env.DATABASE_DIALECT ?? 'mysql';

export const get_sequelize_config_name = () => 'sequelize';

export const get_sequelize_config = () => ({
  dialect: sql_dialect as Dialect,
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: parseInt(process.env.DATABASE_PORT ?? '3306'),
  username: process.env.DATABASE_USER ?? 'root',
  password: process.env.DATABASE_PASSWORD ?? '',
  database: process.env.DATABASE_NAME ?? 'syncventory_notification',
  dialectOptions: {
    ssl: isProduction() && {
      rejectUnauthorized: false,
    },
  },
  autoLoadModels: true,
  synchronize: false,
  logging: false,
  transactionType: TYPES.IMMEDIATE,
});

export default registerAs(get_sequelize_config_name(), get_sequelize_config);
