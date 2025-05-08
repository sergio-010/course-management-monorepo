import { CourseStudent } from './course-student.entity';
export declare class Course {
    id: string;
    name: string;
    description: string;
    maxStudents: number;
    createdAt: Date;
    updatedAt: Date;
    courseStudents: CourseStudent[];
    checkFieldsBeforeInsert(): void;
    checkFieldsBeforeUpdate(): void;
}
