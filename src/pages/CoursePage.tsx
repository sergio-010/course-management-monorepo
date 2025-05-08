import React, { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { toast } from 'sonner';

import DiversityIndexGauge from '../components/DiversityIndexGauge';
import CourseModal from '../components/CourseModal';
import StudentModal from '../components/StudentModal';
import StudentList from '../components/StudentList';
import CourseActions from '../components/CourseActions';
import CourseSelector from '../components/CourseSelector';
import { useCourse, useCourses, useCreateCourse, useDeleteCourse, useUpdateCourse } from '../hooks/useCourse';
import { useAddStudentToCourse, useDeleteStudentFromCourse, useStudentsByCourse } from '../hooks/useStudents';

const CoursePage: React.FC = () => {
    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    const [studentName, setStudentName] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [newCourse, setNewCourse] = useState({
        name: '',
        description: '',
        maxStudents: 0
    });
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { data: coursesData, refetch: refetchCourses } = useCourses();
    const courses = coursesData?.data || [];
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

    const { data: course, refetch: refetchCourse } = useCourse(selectedCourseId || undefined);
    const { data: studentsData, refetch: refetchStudents } = useStudentsByCourse(selectedCourseId || undefined);
    const studentList = studentsData?.students || [];

    const createCourseMutation = useCreateCourse();
    const updateCourseMutation = useUpdateCourse();
    const deleteCourseMutation = useDeleteCourse();
    const addStudentMutation = useAddStudentToCourse();
    const deleteStudentMutation = useDeleteStudentFromCourse();

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // 1 segundo
        return () => clearTimeout(timer);
    }, []);

    const handleAddStudent = (e: FormEvent) => {
        e.preventDefault();
        if (!selectedCourseId || (studentList.length >= (course?.maxStudents || 0))) {
            toast.error('El curso ya ha alcanzado el número máximo de estudiantes');
            return;
        }

        addStudentMutation.mutate(
            {
                courseId: selectedCourseId,
                name: studentName,
                email: studentEmail
            },
            {
                onSuccess: () => {
                    setStudentName('');
                    setStudentEmail('');
                    setIsStudentModalOpen(false);
                    refetchStudents();
                }
            }
        );
    };

    const handleDeleteStudent = (id: string) => {
        deleteStudentMutation.mutate(id, {
            onSuccess: () => {
                refetchStudents();
            }
        });
    };

    const handleDeleteCourse = () => {
        if (!selectedCourseId) return;

        if (window.confirm('¿Estás seguro de que deseas eliminar este curso?')) {
            deleteCourseMutation.mutate(selectedCourseId, {
                onSuccess: () => {
                    setSelectedCourseId(courses.length > 1 ? courses[0].id.toString() : null);
                    refetchCourses();
                }
            });
        }
    };

    const handleOpenCourseModal = (isEdit: boolean) => {
        setEditMode(isEdit);
        if (isEdit && course) {
            setNewCourse({
                name: course.name,
                description: course.description,
                maxStudents: course.maxStudents,
            });
        } else {
            setNewCourse({ name: '', description: '', maxStudents: 0 });
        }
        setIsCourseModalOpen(true);
    };

    const handleSaveCourse = (courseData: { name: string; description: string; maxStudents: number }) => {
        if (editMode && selectedCourseId) {
            updateCourseMutation.mutate(
                {
                    id: selectedCourseId,
                    data: courseData
                },
                {
                    onSuccess: () => {
                        refetchCourses();
                        refetchCourse();
                    }
                }
            );
        } else {
            createCourseMutation.mutate(courseData, {
                onSuccess: (newCourse) => {
                    setSelectedCourseId(newCourse.data.id);
                    refetchCourses();
                }
            });
        }
        setIsCourseModalOpen(false);
    };

    const handleSelectCourse = (courseId: string) => {
        setIsLoading(true);
        setTimeout(() => {
            setSelectedCourseId(courseId);
            setIsLoading(false);
        }, 1000); // 1 segundo
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
            {isLoading ? (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="max-w-5xl mx-auto space-y-10">
                    <div className="bg-white p-6 rounded-2xl pb-10 shadow-sm border space-y-6">
                        <div className="flex justify-between items-start">
                            <div className="w-full">
                                <h1 className="text-3xl font-semibold">
                                    {course?.name || 'Selecciona un curso'}
                                </h1>
                                <p className="text-gray-500">
                                    {course?.description || 'Crea un curso para comenzar.'}
                                </p>
                                {courses.length > 0 && (
                                    <CourseSelector
                                        courses={courses}
                                        selectedCourseId={selectedCourseId}
                                        onSelect={handleSelectCourse}
                                    />
                                )}
                            </div>
                            <div className="flex flex-col space-y-2">
                                {courses.length === 0 && (
                                    <button
                                        onClick={() => handleOpenCourseModal(false)}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                                    >
                                        Crear Curso
                                    </button>
                                )}
                                {course && (
                                    <CourseActions
                                        onCreate={() => handleOpenCourseModal(false)}
                                        onEdit={() => handleOpenCourseModal(true)}
                                        onDelete={handleDeleteCourse}
                                    />
                                )}
                            </div>
                        </div>
                        {course && (
                            <>
                                <div className="text-sm text-gray-500">
                                    Cupo máximo: {course.maxStudents}
                                </div>
                                <DiversityIndexGauge
                                    domainDiversity={courses.find(c => c.id.toString() === selectedCourseId)?.domainDiversity || 0}
                                    maxStudents={course.maxStudents}
                                    studentCount={studentList.length}
                                />
                            </>
                        )}
                    </div>

                    {selectedCourseId && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-semibold">Estudiantes</h2>
                                <button
                                    onClick={() => setIsStudentModalOpen(true)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                    disabled={studentList.length >= (course?.maxStudents || 0)}
                                >
                                    Agregar Estudiante
                                </button>
                            </div>

                            {studentsData && studentsData?.total >= (course?.maxStudents || 0) && (
                                <p className="text-red-500 text-sm mt-2">
                                    El curso ya ha alcanzado el número máximo de estudiantes.
                                </p>
                            )}

                            <StudentList
                                data={studentsData?.students || []}
                                onDelete={(id) => handleDeleteStudent(id)}
                            />
                        </div>
                    )}
                </div>
            )}

            <CourseModal
                isOpen={isCourseModalOpen}
                onClose={() => setIsCourseModalOpen(false)}
                course={newCourse}
                onSave={handleSaveCourse}
                onCourseChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const { name, value } = e.target;
                    setNewCourse({
                        ...newCourse,
                        [name]: name === 'maxStudents' ? Number(value) : value,
                    });
                }}
                isEditing={editMode}
            />

            <StudentModal
                isOpen={isStudentModalOpen}
                onClose={() => setIsStudentModalOpen(false)}
                studentName={studentName}
                studentEmail={studentEmail}
                onNameChange={(e) => setStudentName(e.target.value)}
                onEmailChange={(e) => setStudentEmail(e.target.value)}
                onSave={handleAddStudent}
            />
        </div>
    );
};

export default CoursePage;
