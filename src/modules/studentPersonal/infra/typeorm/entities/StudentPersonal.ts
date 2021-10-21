import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Personal } from '@modules/personals/infra/typeorm/entities/Personal';
import { Student } from '@modules/students/infra/typeorm/entities/Student';

@Entity('personal_student')
class StudentPersonal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  student_id: string;

  @OneToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column()
  personal_id: string;

  @OneToOne(() => Personal)
  @JoinColumn({ name: 'personal_id' })
  personal: Personal;

  @Column()
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { StudentPersonal };
