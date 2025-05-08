import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';

import { CourseService } from './course.service';

import { AddStudentToCourseDto } from './dto/add-student.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PaginationDto } from '../common/dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.courseService.findAll(pagination);
  }

  @Get('students')
  getStudentsFromCourse(@Query('courseId', ParseUUIDPipe) courseId: string) {
    return this.courseService.getStudentsFromCourse(courseId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.courseService.remove(id);
  }

  @Post('students')
  addStudentToCourse(@Body() dto: AddStudentToCourseDto) {
    return this.courseService.addStudentToCourse(dto.courseId, dto.studentId);
  }

  @Delete('students/:id')
  removeStudentFromCourse(@Param('id', ParseUUIDPipe) id: string) {
    return this.courseService.removeStudentFromCourse(id);
  }
}
