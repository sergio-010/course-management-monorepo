import { IsUUID } from 'class-validator';

export class AddStudentToCourseDto {
  @IsUUID()
  courseId: string;

  @IsUUID()
  studentId: string;
}
