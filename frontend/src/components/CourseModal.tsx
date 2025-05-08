import type { FC, FormEvent } from 'react';
import type { CourseModalProps } from '../interfaces';

const CourseModal: FC<CourseModalProps> = ({
    isOpen,
    onClose,
    onSave,
    course,
    onCourseChange,
    isEditing = false,
    isLoading = false,
}) => {
    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSave(course);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-6 shadow-xl">
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        {isEditing ? 'Editar Curso' : 'Nuevo Curso'}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {isEditing ? 'Modifica los detalles del curso' : 'Completa la información del nuevo curso'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nombre del Curso
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={course.name}
                            onChange={onCourseChange}
                            placeholder="Ej: Introducción a React"
                            className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-4 py-2.5 text-sm transition-all"
                            required
                            minLength={3}
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Descripción
                        </label>
                        <input
                            id="description"
                            type="text"
                            name="description"
                            value={course.description}
                            onChange={onCourseChange}
                            placeholder="Ej: Aprende los fundamentos de React"
                            className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-4 py-2.5 text-sm transition-all"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="maxStudents" className="block text-sm font-medium text-gray-700">
                            Cupo máximo
                        </label>
                        <input
                            id="maxStudents"
                            type="number"
                            name="maxStudents"
                            value={course.maxStudents || ''}
                            onChange={onCourseChange}
                            placeholder="Ej: 30"
                            className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-4 py-2.5 text-sm transition-all"
                            min="1"
                            required
                        />
                    </div>

                    <div className="flex space-x-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-70"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-70"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {isEditing ? 'Actualizando...' : 'Creando...'}
                                </span>
                            ) : (
                                <span>{isEditing ? 'Actualizar curso' : 'Crear curso'}</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseModal;