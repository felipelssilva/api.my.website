import {
  Entity,
  ObjectIdColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import { IsString, IsNotEmpty } from 'class-validator';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  // @Column()
  // @IsString()
  // @IsNotEmpty()
  // @Index({ unique: true })
  // email: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: string;

  @BeforeInsert()
  async b4register() {
    this._id = await uuid.v1();
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeUpdate()
  async b4update() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async matchesPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}
