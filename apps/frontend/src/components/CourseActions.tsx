import React from 'react';

interface CourseActionsProps {
    onCreate: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const CourseActions: React.FC<CourseActionsProps> = ({ onCreate, onEdit, onDelete }) => {
    return (
        <div className="flex gap-2">
            <button
                onClick={onCreate}
                className="px-4 py-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
            >
                Crear
            </button>
            <button
                onClick={onEdit}
                className="px-4 py-2 rounded-md bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
            >
                Editar
            </button>
            <button
                onClick={onDelete}
                className="px-4 py-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
            >
                Eliminar
            </button>
        </div>
    );
};

export default CourseActions;
