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
exports.CourseService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const course_entity_1 = require("./entities/course.entity");
const student_entity_1 = require("../student/entities/student.entity");
const course_student_entity_1 = require("./entities/course-student.entity");
const utils_1 = require("../utils");
let CourseService = class CourseService {
    constructor(courseRepository, studentRepository, courseStudentRepository) {
        this.courseRepository = courseRepository;
        this.studentRepository = studentRepository;
        this.courseStudentRepository = courseStudentRepository;
    }
    async create(createCourseDto) {
        try {
            const data = this.courseRepository.create(createCourseDto);
            const newCourse = await this.courseRepository.save(data);
            return { ok: true, data: newCourse, message: 'Curso creado con éxito' };
        }
        catch (error) {
            (0, utils_1.validateErrors)(error, 'un curso', 'nombre');
        }
    }
    async findAll(pagination) {
        const { limit = 10, offset = 0 } = pagination;
        const findOptions = {
            take: limit,
            skip: offset,
            order: { id: 'ASC' },
        };
        const [courses, total] = await this.courseRepository.findAndCount(findOptions);
        const coursesWithDiversity = await Promise.all(courses.map(async (course) => {
            const domainDiversity = await this.calculateDomainDiversity(course.id);
            return {
                ...course,
                domainDiversity,
            };
        }));
        return { data: coursesWithDiversity, total };
    }
    async findOne(id) {
        const course = await this.courseRepository.findOneBy({ id });
        if (!course)
            throw new common_1.NotFoundException('Curso no encontrado');
        return course;
    }
    async update(id, updateCourseDto) {
        const course = await this.findOne(id);
        try {
            Object.assign(course, updateCourseDto);
            const updatedCourse = await this.courseRepository.save(course);
            return { ok: true, data: updatedCourse, message: 'Curso actualizado' };
        }
        catch (error) {
            (0, utils_1.validateErrors)(error, 'un curso', 'nombre');
        }
    }
    async remove(id) {
        const course = await this.findOne(id);
        await this.courseRepository.remove(course);
        return { ok: true, message: 'Curso eliminado con éxito' };
    }
    async addStudentToCourse(courseId, studentId) {
        const course = await this.courseRepository.findOne({
            where: { id: courseId },
            relations: { courseStudents: true },
        });
        const student = await this.studentRepository.findOneBy({ id: studentId });
        if (!course)
            throw new common_1.NotFoundException('Curso no encontrado');
        if (!student)
            throw new common_1.NotFoundException('Estudiante no encontrado');
        const exists = await this.courseStudentRepository.findOne({
            where: { course: { id: courseId }, student: { id: studentId } },
        });
        if (exists)
            throw new common_1.BadRequestException('El estudiante ya está inscrito en este curso');
        const currentCount = course.courseStudents.length;
        if (currentCount >= course.maxStudents) {
            throw new common_1.BadRequestException('El curso ha alcanzado el número máximo de estudiantes');
        }
        const newEntry = this.courseStudentRepository.create({
            course,
            student,
        });
        await this.courseStudentRepository.save(newEntry);
        return { ok: true, message: 'Estudiante agregado al curso con éxito' };
    }
    async getStudentsFromCourse(courseId) {
        const course = await this.findOne(courseId);
        if (!course)
            throw new common_1.NotFoundException('Curso no encontrado');
        const [students, total] = await this.courseStudentRepository.findAndCount({
            where: {
                course: { id: courseId },
            },
            select: ['id'],
            relations: {
                student: true,
            },
            order: { createdAt: 'ASC' },
        });
        return { students, total };
    }
    async removeStudentFromCourse(id) {
        const relation = await this.courseStudentRepository.findOne({
            where: {
                id,
            },
            relations: ['course', 'student'],
        });
        if (!relation)
            throw new common_1.NotFoundException('No se encontro un estudiante en el curso');
        await this.courseStudentRepository.remove(relation);
        return { ok: true, message: 'Estudiante eliminado del curso' };
    }
    async calculateDomainDiversity(courseId) {
        const relations = await this.courseStudentRepository.find({
            where: { course: { id: courseId } },
            relations: ['student'],
        });
        const totalStudents = relations.length;
        const uniqueDomains = new Set(relations
            .map((rel) => {
            const email = rel.student.email;
            if (email && email.includes('@')) {
                return email.split('@')[1].toLowerCase();
            }
            return null;
        })
            .filter(Boolean));
        const diversity = totalStudents > 0
            ? Math.round((uniqueDomains.size / totalStudents) * 100)
            : 0;
        return diversity;
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(2, (0, typeorm_1.InjectRepository)(course_student_entity_1.CourseStudent)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CourseService);
//# sourceMappingURL=course.service.js.map