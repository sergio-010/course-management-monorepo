import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateCourseDto {
  @IsString({ message: 'El nombre del curso debe ser un string' })
  @IsNotEmpty({ message: 'El nombre del curso es requerido' })
  @MaxLength(120, {
    message: 'El nombre del curso debe tener máximo 120 caracteres',
  })
  name: string;

  @IsString({ message: 'La descripción del curso debe ser un string' })
  @IsNotEmpty({ message: 'La descripción del curso es requerido' })
  @MaxLength(255, {
    message: 'La descripción del curso debe tener máximo 255 caracteres',
  })
  description: string;

  @IsNotEmpty({ message: 'El máximo de alumnos del curso es requerido' })
  @IsInt({
    message: 'El máximo de alumnos del curso debe ser un número entero',
  })
  @Min(1, { message: 'El máximo de alumnos del curso debe ser mayor a 0' })
  maxStudents: number;
}
