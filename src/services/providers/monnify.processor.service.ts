import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { getMonnifyConfigName, MonnifyConfig } from 'src/config/monnify.config';

import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import applyCaseMiddleware from 'axios-case-converter';
import * as crypto from 'crypto';
import { RelatedService } from 'src/services/related.service';
import { GenerateTokenResponse } from 'src/utils/monnify.utils';
import { AxiosHttpService } from 'src/services/axios-http.service';

@Injectable()
export class MonnifyProcessorService implements OnModuleInit {
  private readonly baseUrl: string;
  private readonly monnifySecret: string;
  private readonly contractCode: string;
  private readonly merchantAccountNumber: string;
  private readonly encodedCredentials: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
    private readonly relatedService: RelatedService,
    private readonly axiosHttpService: AxiosHttpService,
  ) {
    const paymentConfig = this.configService.get<MonnifyConfig>(
      getMonnifyConfigName(),
    );

    const credentials = `${paymentConfig.key}:${paymentConfig.secret}`;
    this.encodedCredentials = Buffer.from(credentials).toString('base64');
    this.baseUrl = paymentConfig.baseUrl;
    this.monnifySecret = paymentConfig.secret;
    this.contractCode = paymentConfig.contractCode;
    this.merchantAccountNumber = paymentConfig.merchantAccountNumber;
  }

  async loginMonnify(returnClient = false) {
    try {
      let baseUrl = this.baseUrl;
      let encodedCredentials = this.encodedCredentials;
      // const client = axios.create({
      //   baseURL: this.baseUrl,
      //   headers: { Authorization: `Basic ${this.encodedCredentials}` },
      // });
      // if (returnClient) {
      //   return {
      //     client,
      //     accessToken: null,
      //     expiresIn: null,
      //   };
      // }
      const data = await this.axiosHttpService.postData(
        `${baseUrl}/api/v1/auth/login`,
        null,
        true,
        encodedCredentials,
        null,
        'Basic',
      );
      const response: GenerateTokenResponse = data;

      if (!response || !response.requestSuccessful) {
        this.logger.error('Monnify login failed', { data });
        throw new Error(response?.responseMessage || 'Monnify login failed');
      }

      return {
        // client,
        accessToken: response.responseBody.accessToken,
        expiresIn: response.responseBody.expiresIn,
      };
    } catch (error) {
      this.logger.error(
        'Monnify login error',
        error.response?.data || error.message,
      );
      throw new HttpException(
        error.response?.data || error.message,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Generates a new Axios client for each request
  async setupClient(token: string, applyCase = true): Promise<AxiosInstance> {
    const client = applyCase
      ? applyCaseMiddleware(
          axios.create({
            baseURL: this.baseUrl,
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }),
        )
      : axios.create({
          baseURL: this.baseUrl,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

    // Add interceptor to refresh token on 401 response
    client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401) {
          // Refresh token if 401 Unauthorized
          const newToken = await this.generateToken(); // Fetch new token
          error.config.headers['Authorization'] = `Bearer ${newToken}`; // Update token in headers
          await this.setupClient(newToken); // Reinitialize client
          return client.request(error.config); // Retry the original request
        }
        return Promise.reject(error);
      },
    );

    return client;
  }

  // Generates token and sets up the client with refreshed token
  async generateToken(): Promise<string> {
    try {
      const { token, expiresAt } =
        await this.relatedService.getMonnifySecretV2();

      // TODO: This is purely experimental at this point.
      // Check if the token is expired or about to expire
      if (!token || this.isTokenExpired(expiresAt)) {
        const newTokenData = await this.loginMonnify();
        const newExpiresAt = Date.now() + newTokenData.expiresIn * 1000; // Convert expiresIn to milliseconds
        await this.relatedService.manageMonnifySecret(
          newTokenData.accessToken,
          newExpiresAt,
        );
        return newTokenData.accessToken;
      }

      return token;
    } catch (error) {
      this.logger.error(
        'Generate token failed',
        error.response?.data || error.message,
      );
      throw new ConflictException(error.response?.data || error.message);
    }
  }

  private isTokenExpired(expiresAt: number): boolean {
    // Consider token expired if it's within 2 minutes of expiring
    const bufferTime = 2 * 60 * 1000; // 2 minutes in milliseconds
    return Date.now() + bufferTime >= expiresAt;
  }

  // Verify the authenticity of the incoming webhook by comparing the computed hash with 'monnify-signature'
  verifyWebhookSignature(requestBody: any, signature: any, logger: Logger) {
    const computedHash = crypto
      .createHmac('sha512', this.monnifySecret)
      .update(requestBody)
      .digest('hex');
    logger.log({ 'Monnify Computed Hash:': computedHash });
    return computedHash === signature;
    // return true;
  }

  onModuleInit(): void {
    // No client setup on init anymore, handled per request
  }
}
