import { Course } from './course.entity';
import { Student } from '../../student/entities/student.entity';
export declare class CourseStudent {
    id: string;
    course: Course;
    student: Student;
    createdAt: Date;
    updatedAt: Date;
}
