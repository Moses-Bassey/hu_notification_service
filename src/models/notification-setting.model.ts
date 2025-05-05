import {
  Table,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
} from 'sequelize-typescript';
import { Auditable } from 'src/models/auditable.model';

@Table({
  tableName: 'notification_settings',
})
export class NotificationSetting extends Auditable {
  @PrimaryKey
  @AutoIncrement
  @Column({
    allowNull: false,
  })
  id: number;

  @Column({
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  uuid: string;

  @Column({
    allowNull: true,
  })
  user_id: number;

  @Column({
    allowNull: true,
    defaultValue: false,
  })
  news_updates: boolean;

  @Column({
    allowNull: true,
    defaultValue: false,
  })
  early_access: boolean;

  @Column({
    allowNull: true,
    defaultValue: false,
  })
  events: boolean;

  @Column({
    allowNull: true,
    defaultValue: false,
  })
  product_offers: boolean;

  @Column({
    allowNull: true,
    defaultValue: false,
  })
  out_of_stock: boolean;

  @Column({
    allowNull: true,
    defaultValue: false,
  })
  product_purchase: boolean;

  @Column({
    allowNull: true,
    defaultValue: false,
  })
  product_tracking: boolean;

  @Column({
    allowNull: true,
    defaultValue: false,
  })
  product_delivered: boolean;

  @Column({
    allowNull: true,
    defaultValue: false,
  })
  sales_order: boolean;

  @Column({
    allowNull: true,
    defaultValue: false,
  })
  product_complaints: boolean;

  @Column({
    allowNull: true,
    defaultValue: false,
  })
  notify_invoice: boolean;

  @Column({
    allowNull: true,
    // defaultValue: false,
  })
  receive_notifications: string;

  // @Column({
  //   allowNull: true,
  //   defaultValue: false,
  // })
  // receive_notifications_via_customer_support: boolean;
}
