export interface Lesson {
  id: number;
  title: string;
  order: number;
  is_preview: boolean;
}

export interface Module {
  id: number;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  price: string;
  status: "draft" | "published";
  modules: Module[];
}