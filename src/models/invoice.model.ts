import {
  Table,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
} from 'sequelize-typescript';
import { Auditable } from 'src/models/auditable.model';

@Table({
  tableName: 'invoices',
})
export class Invoice extends Auditable {
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
  name?: string;

  @Column({
    allowNull: false,
  })
  invoice?: string;

  @Column({
    allowNull: true,
  })
  preview?: string;
}
