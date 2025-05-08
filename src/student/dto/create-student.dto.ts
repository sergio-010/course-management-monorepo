import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateStudentDto {
  @IsString({ message: 'El nombre del estudiante debe ser un string' })
  @IsNotEmpty({ message: 'El nombre del estudiante es requerido' })
  @MaxLength(255, {
    message: 'El nombre del curso debe tener máximo 255 caracteres',
  })
  name: string;

  @IsEmail({}, { message: 'Debe ingresar un email válido' })
  @IsString({ message: 'El email del estudiante debe ser un string' })
  @IsNotEmpty({ message: 'El email del estudiante es requerido' })
  @MaxLength(255, {
    message: 'El email del estudiante debe tener máximo 255 caracteres',
  })
  email: string;
}
