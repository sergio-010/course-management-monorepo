import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { FindManyOptions, Repository } from 'typeorm';

import { Student } from './entities/student.entity';

import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PaginationDto } from '../common/dto';

import { validateErrors } from '../utils';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    try {
      const data = this.studentRepository.create(createStudentDto);
      const newStudent = await this.studentRepository.save(data);

      return {
        ok: true,
        data: newStudent,
        message: 'Estudiante creado con éxito',
      };
    } catch (error) {
      validateErrors(error, 'un estudiante', 'email');
    }
  }

  async findAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;

    const findOptions: FindManyOptions<Student> = {
      take: limit,
      skip: offset,
      order: { id: 'ASC' },
    };

    const [students, total] =
      await this.studentRepository.findAndCount(findOptions);

    return { data: students, total };
  }

  async findOne(id: string) {
    const student = await this.studentRepository.findOneBy({ id });

    if (!student) throw new NotFoundException('Curso no encontrado');

    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.findOne(id);

    try {
      Object.assign(student, updateStudentDto);

      const updatedStudent = await this.studentRepository.save(student);

      return {
        ok: true,
        data: updatedStudent,
        message: 'Estudiante actualizado',
      };
    } catch (error) {
      validateErrors(error, 'un estudiante', 'nombre');
    }
  }

  async remove(id: string) {
    const student = await this.findOne(id);

    await this.studentRepository.remove(student);

    return { ok: true, message: 'Estudiante eliminado con éxito' };
  }
}
