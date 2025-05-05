export type RecordId = string | number;

export enum EmailSubject {
  NEW_ACCOUNT_CREATED = 'NEW_ACCOUNT_CREATED',
  NEW_USER_BUSINESS_DATA = 'NEW_USER_BUSINESS_DATA',
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
  ACCOUNT_DISABLED = 'ACCOUNT_DISABLED',
  ACCOUNT_ACTIVATION = 'ACCOUNT_ACTIVATION',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  REQUEST_PASSWORD_RESET = 'REQUEST_PASSWORD_RESET',
  SALES_ORDER_DETAILS = 'SALES_ORDER_DETAILS',
  ORDER_INVOICE_DETAILS = 'ORDER_INVOICE_DETAILS',
  PURCHASE_ORDER_DETAILS = 'PURCHASE_ORDER_DETAILS',
  CUSTOMER_FEEDBACK = 'CUSTOMER_FEEDBACK',
  SALES_HISTORY_DETAILS = 'SALES_HISTORY_DETAILS',
  PAYMENT_RECEIPT = 'PAYMENT_RECEIPT',
  PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS',
  COMPLETE_ONBOARDING = 'COMPLETE_ONBOARDING',
  SECURE_TWO_FA = 'SECURE_TWO_FA',
  COMPLETE_TWO_FA = 'COMPLETE_TWO_FA',
  STOCK_TRANSFER_INITIATED = 'STOCK_TRANSFER_INITIATED',
  STOCK_TRANSFER_COMPLETED = 'STOCK_TRANSFER_COMPLETED',
  SETTINGS_CHANGED = 'SETTINGS_CHANGED',
  NOTIFICATION_PREFERENCE_UPDATED = 'NOTIFICATION_PREFERENCE_UPDATED',
  SUBSCRIPTION_CONFIRMATION = 'SUBSCRIPTION_CONFIRMATION',
  UPCOMING_PLAN_EXPIRY = 'UPCOMING_PLAN_EXPIRY',
  PAYMENT_FAILURE = 'PAYMENT_FAILURE',
  SUBSCRIPTION_INVOICE = 'SUBSCRIPTION_INVOICE',
  SUBSCRIPTION_PLAN_CHANGE = 'SUBSCRIPTION_PLAN_CHANGE',
  SYSTEM_MAINTENANCE = 'SYSTEM_MAINTENANCE',
  FEATURES_UPDATE = 'FEATURES_UPDATE',
  SECURITY_ALRET = 'SECURITY_ALERT',
  MESSAGE_RECEIVED = 'MESSAGE_RECEIVED',
  CUSTOMER_COMPLAINTS = `CUSTOMER'S COMPLAINTS`,
  MANDATE_AUTHORIZATION_LINK = 'MANDATE_AUTHORIZATION_LINK'
}

export interface EmailProcessor {
  name: string;
  link?: string;
  date_time?: string;
  location?: string;
  email?: string;
  plan_name?: string;
  start_date?: string;
  renewal_date?: string;
  graded_state?: string;
}

export interface OrderDetailsProcessor {
  name: string;
  products: OrderProductDetails[];
  delivery_status: string;
  tax: number;
  discount: number;
  promo: string;
  total_order_quantity: number;
  total_order_price: number;
  business: BusinessDetails;
  customer: CustomerDetails;
  link?: string;
  order_id?: string;
  vat?: number;
  shipping_fee?: number;
}

export interface OrderInvoiceDetailsProcessor {
  name: string;
  products: OrderProductDetails[];
  business: BusinessDetails;
  customer: CustomerDetails;
  invoice_number: number;
  payment_status: string;
  issued_on: string;
  due_on: string;
  shipping_fee: number;
  vat: number;
  amount_due: number;
  link?: string;
}

export interface PaymentReceiptProcessor {
  products: OrderProductDetails[];
  business: BusinessDetails;
  customer: CustomerDetails;
  total_quantity: number;
  payment_status: string;
  date_issued: string;
  payment_method: string;
  order_id: string;
  receipt_number: string;
  order_total: number;
  cashier_name: string;
  note: string;
  link?: string;
}

export interface PurchaseOrderProcessor {
  name: string;
  products: OrderProductDetails[];
  business: BusinessDetails;
  outlet: OutletDetails;
  supplier: SupplierDetails;
  invoice_number: string;
  purchase_number: string;
  amount_due: number;
  delivery_date: string;
  proposed_arrival_date: string;
  total_order_price: number;
  total_order_quantity: number;
  note_to_supplier?: string;
  link?: string;
}

export interface OrderProductDetails {
  product_name: string;
  product_description: string;
  quantity: string;
  price: string;
  sub_total?: string;
  currency?: CurrencyDetails
  sku_code?: string;
  stock_available?: number;
  total_price?: number;
  variant_name?: string;
  image_link?: string;
}

export interface CustomerFeedBack {
  recommendation: string;
  user: CustomerDetails,
  shouldFollowUp?: boolean;
  name: string;
  link?: string;
}

export interface AutomatedResponse {
  user: CustomerDetails,
  name: string;
  link?: string;
}
export interface ContactForm {
  question: string;
  user: CustomerDetails,
  name: string;
  link?: string;
}

export interface BusinessDetails {
  business_name: string;
  phone_number: string;
  email_address: string;
  address: string;
}

export interface SupplierDetails {
  supplier_name: string;
  supplier_email: string;
  phone_number: string;
}

export interface OutletDetails {
  outlet_name: string;
  outlet_address: AddressDetails
}

export interface AddressDetails {
  address: string;
}

export interface CustomerDetails {
  customer_name: string;
  phone_number: string;
  email_address: string;
  address: string;
}

export interface CurrencyDetails {
  name: string;
  symbol: string;
}

export interface EmailData {
  user_id?: number;
  to: string | string[];
  from: string;
  subject: string;
  key: string;
  text?: string;
  html?: string;
  meta?: string;
  business_id?: number;
}

export interface KafkaEmailData {
  key: string;
  value: any | any[];
  receiving_email: string | string[];
}

export type SecurityConfig = {
  jwt_secret: string;
};

export interface RequestPasswordResponse {
  message: string;
}

export interface ValidationError {
  error: string;
  message: string;
}

export interface ResponseData<T> {
  status: number | string;
  message: string;
  data: T | T[];
}

export interface IAuthUser {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}

export enum NotificationTypes {
  ORDER = 'order',
  INVOICE = 'invoice',
  RECEIPT = 'receipt',
  ACCOUNTS = 'accounts',
  FEEDBACK = 'feedback',
  DISABLED_ACCOUNT = 'disabled_account'
}
