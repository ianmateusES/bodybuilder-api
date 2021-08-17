import { ObjectId } from 'mongodb';
import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('exercises')
class Exercise {
  @ObjectIdColumn({ generated: true })
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  member: string;

  @Column()
  group: string;

  @Column()
  personal_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // constructor() {
  //   if (!this.id) {
  //     this.id = new ObjectId();
  //   }
  // }
}

export { Exercise };
