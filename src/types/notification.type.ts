import { IAuditable } from 'src/types/auditable.type';

export interface INotification extends IAuditable {
    id: number;
    uuid?: string;
    title?: string;
    content?: string;
}
