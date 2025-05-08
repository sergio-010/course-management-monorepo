import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Course } from './course.entity';
import { Student } from '../../student/entities/student.entity';

@Entity()
@Unique(['course', 'student'])
export class CourseStudent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Course, (course) => course.courseStudents, {
    onDelete: 'CASCADE',
  })
  course: Course;

  @ManyToOne(() => Student, (student) => student.courseStudents, {
    onDelete: 'CASCADE',
  })
  student: Student;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
