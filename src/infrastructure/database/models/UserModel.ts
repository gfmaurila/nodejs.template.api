import { Table, Column, DataType, Model, PrimaryKey, AutoIncrement, Default } from "sequelize-typescript";

@Table({ tableName: "TB_USER", timestamps: true })
export class UserModel extends Model<UserModel> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  Id!: number;

  @Column({ type: DataType.STRING(100), allowNull: false })
  Name!: string;

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  Email!: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  Senha!: string;

  @Column({ type: DataType.STRING(20), allowNull: true })
  Phone?: string;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  createdAt!: Date;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  updatedAt!: Date;
}
