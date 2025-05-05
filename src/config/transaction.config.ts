import { registerAs } from '@nestjs/config';

const { TRANSACTION_SERVICE_BASE_URL } = process.env;

export type TransactionConfig = {
  baseUrl: string;
};

export const getTransactionBaseUrl = () => TRANSACTION_SERVICE_BASE_URL;
export const getTransactionConfigName = () => 'transaction';

export const getTransactionConfig = (): TransactionConfig => ({
  baseUrl: getTransactionBaseUrl(),
});

export default registerAs(getTransactionConfigName(), getTransactionConfig);
