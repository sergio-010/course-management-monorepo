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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourseDto = void 0;
const class_validator_1 = require("class-validator");
class CreateCourseDto {
}
exports.CreateCourseDto = CreateCourseDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'El nombre del curso debe ser un string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre del curso es requerido' }),
    (0, class_validator_1.MaxLength)(120, {
        message: 'El nombre del curso debe tener máximo 120 caracteres',
    }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'La descripción del curso debe ser un string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La descripción del curso es requerido' }),
    (0, class_validator_1.MaxLength)(255, {
        message: 'La descripción del curso debe tener máximo 255 caracteres',
    }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El máximo de alumnos del curso es requerido' }),
    (0, class_validator_1.IsInt)({
        message: 'El máximo de alumnos del curso debe ser un número entero',
    }),
    (0, class_validator_1.Min)(1, { message: 'El máximo de alumnos del curso debe ser mayor a 0' }),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "maxStudents", void 0);
//# sourceMappingURL=create-course.dto.js.map