export interface GenerateTokenResponse {
  requestSuccessful: boolean;
  responseMessage: string;
  responseCode: string;
  responseBody: {
    accessToken: string;
    expiresIn: number;
  };
}

export enum MonnifyEventType {
  SUCCESSFUL_DISBURSEMENT = 'SUCCESSFUL_DISBURSEMENT',
  SUCCESSFUL_TRANSACTION = 'SUCCESSFUL_TRANSACTION',
  MANDATE_UPDATE = 'MANDATE_UPDATE',
}

export interface MonnifyEventDataCustomer {
  email: string;
  name?: string;
}

export interface MonnifyEventDataProduct {
  reference: string;
  type: string;
}

export interface MonnifyEventDataTransferReceived {
  product: MonnifyEventDataProduct;
  transactionReference: string;
  paymentReference: string;
  paidOn: string;
  externalMandateReference?: string;
  paymentDescription: string;
  metaData: any;
  paymentSourceInformation: any;
  destinationAccountInformation: any;
  amountPaid: number;
  totalPayable: number;
  cardDetails: any;
  paymentMethod: string;
  currency: string;
  settlementAmount: string;
  paymentStatus: string;
  customer: MonnifyEventDataCustomer;
}

export interface MonnifyWebhookPayload {
  eventType: MonnifyEventType;
  eventData: MonnifyEventDataTransferReceived;
}
