import { CourseStudent } from '../../course/entities/course-student.entity';
export declare class Student {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    courseStudents: CourseStudent[];
    checkFieldsBeforeInsert(): void;
    checkFieldsBeforeUpdate(): void;
}
