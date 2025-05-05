import { IAuditable } from 'src/types/auditable.type';

export interface IInvoice extends IAuditable {
  id: number;
  name?: string;
  invoice?: string;
  preview?: string;
}
