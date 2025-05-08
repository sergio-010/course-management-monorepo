import axiosInstance from "./axiosInstance";
import type { Course, Student } from "../interfaces";

// Cursos

export const createCourse = async (data: Partial<Course>) => {
  const response = await axiosInstance.post<{
    ok: boolean;
    data: Course;
    message: string;
  }>("/course", data);
  return response.data;
};

export const updateCourse = async (id: string, data: Partial<Course>) => {
  const response = await axiosInstance.patch<Course>(`/course/${id}`, data);
  return response.data;
};

export const getCourse = async (id: string) => {
  const response = await axiosInstance.get<Course>(`/course/${id}`);
  return response.data;
};

export const getCourses = async (limit = 10, offset = 0) => {
  const response = await axiosInstance.get<{ data: Course[]; total: number }>(
    `/course?limit=${limit}&offset=${offset}`
  );
  return response.data;
};

export const deleteCourse = async (id: string) => {
  await axiosInstance.delete(`/course/${id}`);
};

// Estudiantes por curso

export const getStudentsByCourse = async (
  courseId: string,
  limit = 5,
  offset = 0
): Promise<{
  students: { id: string; student: Student }[];
  total: number;
}> => {
  const response = await axiosInstance.get<{
    students: { id: string; student: Student }[];
    total: number;
  }>(`/course/students?courseId=${courseId}&limit=${limit}&offset=${offset}`);
  console.log(response.data);
  return response.data;
};

export const addStudentToCourse = async (data: {
  courseId: string;
  name: string;
  email: string;
}): Promise<{ ok: boolean; message: string }> => {
  const response = await axiosInstance.post<{
    id: string;
    data: Student;
    message: string;
  }>(`/student`, {
    name: data.name,
    email: data.email,
  });

  if (response.status !== 201 || !response.data)
    throw new Error(response.data.message || "Error al agregar estudiante");

  const dataAdd = {
    courseId: data.courseId,
    studentId: response.data.data.id,
  };

  console.log(dataAdd);

  const res = await axiosInstance.post<{ ok: boolean; message: string }>(
    `/course/students`,
    dataAdd
  );

  if (res.status !== 201 || !res.data)
    throw new Error("Error al agregar estudiante al curso");

  return res.data;
};

export const deleteStudentFromCourse = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/course/students/${id}`);
};
