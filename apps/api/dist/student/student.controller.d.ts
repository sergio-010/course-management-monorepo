import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PaginationDto } from '../common/dto';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    create(createStudentDto: CreateStudentDto): Promise<{
        ok: boolean;
        data: import("./entities/student.entity").Student;
        message: string;
    }>;
    findAll(pagination: PaginationDto): Promise<{
        data: import("./entities/student.entity").Student[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./entities/student.entity").Student>;
    update(id: string, updateStudentDto: UpdateStudentDto): Promise<{
        ok: boolean;
        data: import("./entities/student.entity").Student;
        message: string;
    }>;
    remove(id: string): Promise<{
        ok: boolean;
        message: string;
    }>;
}
