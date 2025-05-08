"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateErrors = void 0;
const common_1 = require("@nestjs/common");
const validateErrors = (error, message = '', field = 'valor') => {
    if (error.code === '23505') {
        throw new common_1.BadRequestException(`Ya existe ${message} con ese ${field}`);
    }
    if (error.status === 400) {
        throw new common_1.BadRequestException(error.message);
    }
    if (error.status === 404) {
        throw new common_1.NotFoundException(error.message);
    }
    throw new common_1.InternalServerErrorException([
        'Error inesperado, verifique los registros del servidor',
        error.detail,
    ]);
};
exports.validateErrors = validateErrors;
//# sourceMappingURL=validate-errors.js.map