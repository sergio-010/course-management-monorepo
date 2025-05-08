import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { Student } from '../student/entities/student.entity';
import { CourseStudent } from './entities/course-student.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PaginationDto } from '../common/dto';
export declare class CourseService {
    private readonly courseRepository;
    private readonly studentRepository;
    private readonly courseStudentRepository;
    constructor(courseRepository: Repository<Course>, studentRepository: Repository<Student>, courseStudentRepository: Repository<CourseStudent>);
    create(createCourseDto: CreateCourseDto): Promise<{
        ok: boolean;
        data: Course;
        message: string;
    }>;
    findAll(pagination: PaginationDto): Promise<{
        data: {
            domainDiversity: number;
            id: string;
            name: string;
            description: string;
            maxStudents: number;
            createdAt: Date;
            updatedAt: Date;
            courseStudents: CourseStudent[];
        }[];
        total: number;
    }>;
    findOne(id: string): Promise<Course>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<{
        ok: boolean;
        data: Course;
        message: string;
    }>;
    remove(id: string): Promise<{
        ok: boolean;
        message: string;
    }>;
    addStudentToCourse(courseId: string, studentId: string): Promise<{
        ok: boolean;
        message: string;
    }>;
    getStudentsFromCourse(courseId: string): Promise<{
        students: CourseStudent[];
        total: number;
    }>;
    removeStudentFromCourse(id: string): Promise<{
        ok: boolean;
        message: string;
    }>;
    private calculateDomainDiversity;
}
