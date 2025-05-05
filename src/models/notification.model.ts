import {
  Table,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Auditable } from 'src/models/auditable.model';

@Table({
  tableName: 'notifications',
})
export class Notification extends Auditable {
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
  title: string;

  @Column({
    allowNull: false,
  })
  content: string;

  @Column({
    allowNull: false,
  })
  preview_content: string;

  @Column({
    allowNull: true,
  })
  type: string;

  @Column({
    defaultValue: false,
  })
  is_read: boolean;

  @Column({
    allowNull: true,
  })
  user_id: number;

  @Column({
    allowNull: true,
  })
  business_id: number;
}
