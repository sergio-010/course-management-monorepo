"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const student_entity_1 = require("./entities/student.entity");
const utils_1 = require("../utils");
let StudentService = class StudentService {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    async create(createStudentDto) {
        try {
            const data = this.studentRepository.create(createStudentDto);
            const newStudent = await this.studentRepository.save(data);
            return {
                ok: true,
                data: newStudent,
                message: 'Estudiante creado con éxito',
            };
        }
        catch (error) {
            (0, utils_1.validateErrors)(error, 'un estudiante', 'email');
        }
    }
    async findAll(pagination) {
        const { limit = 10, offset = 0 } = pagination;
        const findOptions = {
            take: limit,
            skip: offset,
            order: { id: 'ASC' },
        };
        const [students, total] = await this.studentRepository.findAndCount(findOptions);
        return { data: students, total };
    }
    async findOne(id) {
        const student = await this.studentRepository.findOneBy({ id });
        if (!student)
            throw new common_1.NotFoundException('Curso no encontrado');
        return student;
    }
    async update(id, updateStudentDto) {
        const student = await this.findOne(id);
        try {
            Object.assign(student, updateStudentDto);
            const updatedStudent = await this.studentRepository.save(student);
            return {
                ok: true,
                data: updatedStudent,
                message: 'Estudiante actualizado',
            };
        }
        catch (error) {
            (0, utils_1.validateErrors)(error, 'un estudiante', 'nombre');
        }
    }
    async remove(id) {
        const student = await this.findOne(id);
        await this.studentRepository.remove(student);
        return { ok: true, message: 'Estudiante eliminado con éxito' };
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StudentService);
//# sourceMappingURL=student.service.js.map