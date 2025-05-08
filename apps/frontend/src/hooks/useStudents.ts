import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getStudentsByCourse,
  addStudentToCourse,
  deleteStudentFromCourse,
} from "../services/courseService";

export const useStudentsByCourse = (courseId?: string) => {
  return useQuery({
    queryKey: ["students", courseId],
    queryFn: async () => {
      if (!courseId) return { students: [], total: 0 };
      return await getStudentsByCourse(courseId);
    },
    enabled: !!courseId,
    placeholderData: { students: [], total: 0 },
  });
};

export const useAddStudentToCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addStudentToCourse,
    onSuccess: (_, variables) => {
      toast.success("✅ Estudiante agregado correctamente");
      queryClient.invalidateQueries({
        queryKey: ["students", variables.courseId],
      });
      queryClient.invalidateQueries({
        queryKey: ["course", variables.courseId],
      });
    },
    onError: (error) => {
      console.error("Error agregando estudiante:", error);
      toast.error("❌ Error al agregar estudiante");
    },
  });
};

export const useDeleteStudentFromCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteStudentFromCourse(id),
    onSuccess: () => {
      toast.success("✅ Estudiante eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error) => {
      console.error("Error eliminando estudiante:", error);
      toast.error("❌ Error al eliminar estudiante");
    },
  });
};
