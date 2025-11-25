import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./User.model";

@Table({
  tableName: "tasks",
  timestamps: true,
})
export class Task extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column(DataType.STRING)
  description?: string;

  @Column({
    type: DataType.ENUM("pending", "in_progress", "done"),
    allowNull: false,
  })
  status!: string;

  @Column({
    type: DataType.ENUM("low", "medium", "high"),
    allowNull: false,
  })
  priority!: string;

  @Column(DataType.DATE)
  deadline?: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  assigneeId!: number;

  @BelongsTo(() => User)
  assignee?: User;
}
