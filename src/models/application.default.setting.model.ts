import {
    AutoIncrement,
    Column,
    DataType,
    PrimaryKey,
    Table,
  } from 'sequelize-typescript';
import { Auditable } from 'src/models/auditable.model';
//   import { AuditableCamel } from 'src/models/related/auditable-camel.model'
  
  @Table({
    tableName: 'application_default_settings',
    underscored: true,
    timestamps: true,
  })
  export class ApplicationDefaultSetting extends Auditable {
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
      allowNull: false,
    })
    purchase_tax_rate: number;
  
    @Column({
      allowNull: false,
    })
    sales_tax_rate: number;
  
    @Column({
      allowNull: true,
    })
    monnifyToken: string;
  
    @Column
    monnifyTokenExpiryAt: string;
  }
  