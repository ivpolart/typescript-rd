import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Task } from "./Task.model";

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @HasMany(() => Task)
  tasks!: Task[];
}
