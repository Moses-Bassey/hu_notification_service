import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { Logger } from 'nestjs-pino';

import { Injectable } from '@nestjs/common';
import { getTransactionConfigName, TransactionConfig } from 'src/config/transaction.config';


// TODO: we need to replace any with actual response types..
@Injectable()
export class TransactionProcessorService {
  private client: AxiosInstance;
  private readonly baseUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {
    const transactionConfig = this.configService.get<TransactionConfig>(
      getTransactionConfigName(),
    );
    this.baseUrl = transactionConfig.baseUrl;
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


  async verifyTransaction(
    reference: string,
    // accessToken?: string,
  ): Promise<any> {
    try {
      this.#setupClient();
      const data = { reference };
      const response = await this.client.put<any>(
        `/transaction/process-payment`,
        data,
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error verifying syncventory payment', {
        reference,
        error,
      });
      throw error;
    }
  }

  async chargeMandate(
    reference: string,
    // accessToken?: string,
  ): Promise<any> {
    try {
      this.#setupClient();
      const data = { reference };
      const response = await this.client.post<any>(
        `/transaction/process-mandate?reference=${encodeURIComponent(
      reference
    )}`,
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error charging mandate', {
        reference,
        error,
      });
      throw error;
    }
  }
}
