import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { Logger } from 'nestjs-pino';

import { Injectable } from '@nestjs/common';
import { getTransactionConfigName, TransactionConfig } from 'src/config/transaction.config';
import { CustomerConfig, getCustomerConfigName } from 'src/config/customer.config';


// TODO: we need to replace any with actual response types..
@Injectable()
export class CustomerProcessorService {
  private client: AxiosInstance;
  private readonly baseUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {
    const customerConfig = this.configService.get<CustomerConfig>(
      getCustomerConfigName(),
    );
    this.baseUrl = customerConfig.baseUrl;
    console.log(this.baseUrl)
  }

  #setupClient(accessToken?: string) {
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }


  async completeSubscription(
    transactionId: number,
    businessId: number,
    cardDetail?: string,
  ): Promise<any> {
    try {
      this.#setupClient();
      const data = { 
        transactionId, 
        businessId,
        cardDetail // Pass the card token if available
      };
      const response = await this.client.put<any>(
        `/subscription/process-subscription`,
        data,
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error completing subscription', {
        transactionId,
        businessId,
        error,
      });
      throw error;
    }
  }
}
