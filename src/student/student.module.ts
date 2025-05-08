import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Student } from './entities/student.entity';
import { CourseStudent } from 'src/course/entities/course-student.entity';

import { StudentService } from './student.service';
import { StudentController } from './student.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Student, CourseStudent])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
