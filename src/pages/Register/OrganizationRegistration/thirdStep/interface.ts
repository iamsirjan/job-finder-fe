export type CourseDetail = {
  grade: string;
  name: string;
  price: string;
  duration: string;
};

export type IOrgThirdStep = {
  gradeSelect: string[];
  courses: CourseDetail[];
};

export type CourseTableProps = {
  courses: CourseDetail[];
  onDelete: (index: number) => void;
};
