import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourse,
  getCourses,
} from "../services/courseService";
import type { Course } from "../interfaces";

// Cursos

export const useCourses = (limit = 10, offset = 0) => {
  return useQuery<{ data: Course[]; total: number }>({
    queryKey: ["courses", limit, offset],
    queryFn: () => getCourses(limit, offset),
    placeholderData: { data: [], total: 0 },
  });
};

export const useCourse = (courseId?: string) => {
  return useQuery<Course | null>({
    queryKey: ["course", courseId],
    queryFn: async () => {
      if (!courseId) return null;
      return await getCourse(courseId);
    },
    enabled: !!courseId,
    placeholderData: null,
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      toast.success("✅ Curso creado correctamente");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      console.error("Error creando curso:", error);
      toast.error("❌ Error al crear el curso");
    },
    meta: { feature: "createCourse" },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Course> }) =>
      updateCourse(id, data),
    onSuccess: () => {
      toast.success("✅ Curso actualizado correctamente");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      console.error("Error actualizando curso:", error);
      toast.error("❌ Error al actualizar el curso");
    },
    meta: { feature: "updateCourse" },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      toast.success("✅ Curso eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      console.error("Error eliminando curso:", error);
      toast.error("❌ Error al eliminar el curso");
    },
    meta: { feature: "deleteCourse" },
  });
};
