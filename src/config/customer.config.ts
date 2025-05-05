import { registerAs } from '@nestjs/config';

const { CUSTOMER_SERVICE_BASE_URL } = process.env;

export type CustomerConfig = {
  baseUrl: string;
};

export const getCustomerBaseUrl = () => CUSTOMER_SERVICE_BASE_URL;
export const getCustomerConfigName = () => 'customer';

export const getCustomerConfig = (): CustomerConfig => ({
  baseUrl: getCustomerBaseUrl(),
});

export default registerAs(getCustomerConfigName(), getCustomerConfig);
