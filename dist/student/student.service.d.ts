import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PaginationDto } from '../common/dto';
export declare class StudentService {
    private readonly studentRepository;
    constructor(studentRepository: Repository<Student>);
    create(createStudentDto: CreateStudentDto): Promise<{
        ok: boolean;
        data: Student;
        message: string;
    }>;
    findAll(pagination: PaginationDto): Promise<{
        data: Student[];
        total: number;
    }>;
    findOne(id: string): Promise<Student>;
    update(id: string, updateStudentDto: UpdateStudentDto): Promise<{
        ok: boolean;
        data: Student;
        message: string;
    }>;
    remove(id: string): Promise<{
        ok: boolean;
        message: string;
    }>;
}
