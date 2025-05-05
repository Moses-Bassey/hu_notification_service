import { registerAs } from '@nestjs/config';
export type MonnifyConfig = {
  baseUrl: string;
  key: string;
  secret: string;
  contractCode: string;
  merchantAccountNumber: string;
};
const baseUrl = process.env.MONNIFY_BASE_URL;
const apiKey = process.env.MONNIFY_API_KEY;
const apiSecret = process.env.MONNIFY_SECRET_KEY;
const contractCode = process.env.MONNIFY_CONTRACT_CODE;
const merchantAccountNumber = process.env.MERCHANT_ACCOUNT_NUMBER;

const getMonnifyConfig = () => ({
  base_url: baseUrl,
  key: apiKey,
  secret: apiSecret,
  contract_code: contractCode,
  merchant_account_number: merchantAccountNumber,
});
export const getMonnifyConfigName = () => 'monnify';
export default registerAs(getMonnifyConfigName(), getMonnifyConfig);
