import { CourseService } from './course.service';
import { AddStudentToCourseDto } from './dto/add-student.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PaginationDto } from '../common/dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    create(createCourseDto: CreateCourseDto): Promise<{
        ok: boolean;
        data: import("./entities/course.entity").Course;
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
            courseStudents: import("./entities/course-student.entity").CourseStudent[];
        }[];
        total: number;
    }>;
    getStudentsFromCourse(courseId: string): Promise<{
        students: import("./entities/course-student.entity").CourseStudent[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./entities/course.entity").Course>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<{
        ok: boolean;
        data: import("./entities/course.entity").Course;
        message: string;
    }>;
    remove(id: string): Promise<{
        ok: boolean;
        message: string;
    }>;
    addStudentToCourse(dto: AddStudentToCourseDto): Promise<{
        ok: boolean;
        message: string;
    }>;
    removeStudentFromCourse(id: string): Promise<{
        ok: boolean;
        message: string;
    }>;
}
