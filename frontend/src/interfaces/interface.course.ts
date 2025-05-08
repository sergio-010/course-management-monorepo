export interface Course {
  id: string;
  name: string;
  description: string;
  maxStudents: number;
  domainDiversity?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface StudentWithRelation {
  id: string;
  student: Student;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  courseId: string;
}

export interface CourseSelectorProps {
  courses: Course[];
  selectedCourseId?: string | null;
  onSelect: (id: string) => void;
  isLoading?: boolean;
}

export interface StudentListProps {
  data: StudentWithRelation[];
  onDelete: (id: string) => void;
}
export interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    name: string;
    description: string;
    maxStudents: number;
  };
  onSave: (courseData: {
    name: string;
    description: string;
    maxStudents: number;
  }) => void;
  onCourseChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing?: boolean;
  isLoading?: boolean;
}

export interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentEmail: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: (e: React.FormEvent) => void;
  isLoading?: boolean;
  isEditing?: boolean;
}
