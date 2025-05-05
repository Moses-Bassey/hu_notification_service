import { Model, Column, CreatedAt, UpdatedAt } from 'sequelize-typescript';

export class Auditable extends Model {
  @Column({
    allowNull: false,
    defaultValue: true,
  })
  active: boolean;

  @CreatedAt
  @Column
  created_at: Date;

  @UpdatedAt
  @Column
  updated_at: Date;
}
