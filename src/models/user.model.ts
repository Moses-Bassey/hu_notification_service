import {
    AutoIncrement,
    Column,
    CreatedAt,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
    DataType,
    DeletedAt,
  } from 'sequelize-typescript';
  import { Auditable } from 'src/models/auditable.model';
  
  @Table({
    tableName: 'users',
    paranoid: true,
  })
  export class User extends Auditable {
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
    first_name: string;
  
    @Column({
      allowNull: false,
    })
    last_name: string;
  
    @Column({
      allowNull: false,
      unique: true,
    })
    email: string;
  
    // @Column({
    //   allowNull: true,
    //   defaultValue: null,
    // })
    // gender: GenderOptions;
  
    @Column({
      allowNull: false,
    })
    password: string;
  
    @Column({
      allowNull: true,
      defaultValue: null,
    })
    dob: Date;
  
    @Column({
      allowNull: true,
      defaultValue: false,
    })
    is_email_verified: boolean;
  
    @Column({
      allowNull: true,
      defaultValue: null,
    })
    last_login_date: Date;
  
    @Column({
      allowNull: true,
      defaultValue: 0,
    })
    num_login_attempts: number;
  
    @Column({
      allowNull: true,
      defaultValue: false,
    })
    has_active_password_reset_link: boolean;
  
    // @Column({
    //   allowNull: false,
    //   defaultValue: 'active',
    // })
    // status: UserStatus;
  
    @Column({
      allowNull: true,
    })
    active: boolean;
  
    // @Column({
    //   allowNull: true,
    //   defaultValue: false
    // })
    // is_deleted?: boolean;
  
    @Column
    scheduled_delete_at: string;
  
    @DeletedAt
    @Column
    deleted_at: Date;
  }
  